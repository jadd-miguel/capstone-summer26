from supabase import create_client, Client
from services.util.data_models import SkillGapInput, CoverLetterGenInput, ResumeGenInput
from services.util.viability_engine import FillableGapAgent
import services.util.llm_agent
import os
import requests
from dotenv import load_dotenv
from services.ml_engine import calculate_match_score, extract_skills

load_dotenv()
ADZUNA_URL = "https://api.adzuna.com/v1/api"
ADZUNA_ID = os.getenv("ADZUNA_ID")
ADZUNA_KEY = os.getenv("ADZUNA_KEY")

DATABASE_URL = "https://hygoffoliyjhxapyxoyr.supabase.co"
DATABASE_ANON = "sb_publishable_lwjXFQ7Q1Eer-56Zk_OpYg_vB6bb135"
JD_TBL_NAME = "users_job_descriptions"
QUALS_TBL_NAME = "users_qualifications"
TARGET_ROLE_NAME = "target_role"

supabase: Client = create_client(DATABASE_URL, DATABASE_ANON)
LLM_MODEL = services.util.llm_agent.DocumentGenerationAgent()

def orchestrate_career_path(payload: dict) -> dict:
    viability = gap_agent(payload)
    template = "experience_first" if viability.get("final_score", 0) >= 70 else "education_first"
    resume = LLM_MODEL.generate_resume(
        candidate_name=payload.get("name"),
        candidate_skills=payload.get("candidate_skills"),
        experience_history=payload.get("experience_history"),
        target_job_title=payload.get("target_job_title"),
        template_type=template
    )
    roadmap = None
    if not viability.get("is_viable", True):
        roadmap = generate_roadmap({
            "missing_skills": viability.get("missing_skills_to_learn", []),
            "target_role": payload.get("target_job_title"),
            "time_to_master_days": 30
        })
    return {
        "status": "success",
        "viability_report": viability,
        "resume": resume,
        "strategy_used": template,
        "roadmap": roadmap
    }

def course_suggest(payload): 
    return LLM_MODEL.course_suggest(payload["topic"])

def get_jobs():
    headers = {
        "Accept": "application/json"
    }
    url = ADZUNA_URL + "/jobs/ca/search/1" + f"?app_id={ADZUNA_ID}" + f"&app_key={ADZUNA_KEY}"
    res = requests.get(url, headers=headers)
    return res.json()

def create_user(payload): return supabase.auth.sign_up(payload)
def login(payload): return supabase.auth.sign_in_with_password(payload)
def logout(): supabase.auth.sign_out()
def name(payload): return supabase.auth.update_user({"data": {"display_name": payload["name"]}})

def get_jds(user_id): return supabase.table(JD_TBL_NAME).select("*").eq("user_id", user_id).execute()
def insert_jd(payload): return supabase.table(JD_TBL_NAME).insert(payload).execute()
def update_jd(payload): return supabase.table(JD_TBL_NAME).update(payload["update"]).eq("id", payload["id"]).execute()
def delete_jd(payload): return supabase.table(JD_TBL_NAME).delete().eq("id", payload["id"]).execute()

def get_quals(user_id): return supabase.table(QUALS_TBL_NAME).select("*").eq("user_id", user_id).execute()
def insert_quals(payload): return supabase.table(QUALS_TBL_NAME).insert(payload).execute()
def update_quals(payload): return supabase.table(QUALS_TBL_NAME).update(payload["update"]).eq("id", payload["id"]).execute()
def delete_quals(payload): return supabase.table(QUALS_TBL_NAME).delete().eq("id", payload["id"]).execute()

def get_role(): return supabase.table(TARGET_ROLE_NAME).select("*").execute()
def insert_role(payload): return supabase.table(TARGET_ROLE_NAME).insert(payload).execute()
def update_role(payload): return supabase.table(TARGET_ROLE_NAME).update(payload["update"]).eq("id", payload["id"]).execute()
def delete_role(payload): return supabase.table(TARGET_ROLE_NAME).delete().eq("id", payload["id"]).execute()

def discover_matching_jobs(payload: dict) -> dict:
    candidate_profile = f"Skills: {', '.join(payload.get('candidate_skills', []))}. Experience: {payload.get('experience_history', '')}"
    query_vector = LLM_MODEL.generate_embedding(candidate_profile)
    if not query_vector:
        return {"status": "error", "message": "Failed to generate candidate embedding."}
    try:
        response = supabase.rpc(
            'match_jobs',
            {
                'query_embedding': query_vector,
                'match_threshold': 0.70,
                'match_count': 3
            }
        ).execute()
        return {"status": "success", "matches": response.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}

def refine_resume_bullets(payload: dict) -> dict:
    raw_bullets = payload.get("raw_bullets", [])
    if hasattr(LLM_MODEL, 'refine_to_star_method'):
        return {"status": "success", "refined": LLM_MODEL.refine_to_star_method(raw_bullets)}
    return {"status": "success", "refined": "STAR formatting logic pending"}

def benchmark_candidate(payload: dict) -> dict:
    candidate_skills = payload.get("candidate_skills", [])
    target_role = payload.get("target_role", "")
    if hasattr(LLM_MODEL, 'generate_benchmark'):
        return {"status": "success", "benchmark": LLM_MODEL.generate_benchmark(candidate_skills, target_role)}
    return {"status": "success", "benchmark": "Benchmark pending"}

def persona_interview_agent(payload: dict) -> dict:
    target_role = payload.get("target_role", "")
    persona = payload.get("persona", "The Technical Lead")
    if hasattr(LLM_MODEL, 'generate_persona_interview'):
        return {"status": "success", "script": LLM_MODEL.generate_persona_interview(target_role, persona)}
    return {"status": "success", "script": "Interview script pending"}

def gap_agent(payload):
    skills = SkillGapInput(payload)
    auditor = FillableGapAgent() 
    return auditor.analyze_viability(skills.candidate_skills, skills.job_requirements)

def cover_letter_agent(payload):
    input_data = CoverLetterGenInput(payload)
    return LLM_MODEL.generate_cover_letter(input_data.candidate_skills, input_data.job_title, input_data.company_name)

def resume_agent(payload):
    input_data = ResumeGenInput(payload)
    return LLM_MODEL.generate_resume(
        input_data.candidate_name, input_data.candidate_skills, 
        input_data.experience_history, input_data.target_job_title
    )

def generate_bridge_roles(payload):
    return LLM_MODEL.generate_bridge_roles(
        candidate_skills=payload.get("candidate_skills", []),
        target_role=payload.get("target_role", "")
    )

def score_resume(payload: dict) -> dict:
    resume = payload.get("current_resume_text", "")
    jd = payload.get("target_job_description", "")
    
    # Run the Math
    score = calculate_match_score(resume, jd)
    
    # Run the NLP Extraction
    found_skills = extract_skills(resume)
    
    return {
        "status": "success",
        "match_score_percentage": score,
        "extracted_skills": found_skills,
        "message": "Hybrid ML analysis complete."
    }

def generate_roadmap(payload):
    return LLM_MODEL.generate_learning_roadmap(
        missing_skills=payload.get("missing_skills", []),
        target_role=payload.get("target_role", ""),
        time_to_master_days=payload.get("time_to_master_days", 30)
    )

def generate_interview(payload):
    return {"status": "success", "interview_prep": "Interview generation pending"}