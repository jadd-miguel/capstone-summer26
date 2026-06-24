from supabase import create_client, Client
from services.util.data_models import SkillGapInput, CoverLetterGenInput, ResumeGenInput
from services.util.viability_engine import FillableGapAgent
import services.util.llm_agent


DATABASE_URL = "https://hygoffoliyjhxapyxoyr.supabase.co"
DATABASE_ANON = "sb_publishable_lwjXFQ7Q1Eer-56Zk_OpYg_vB6bb135"
JD_TBL_NAME = "users_job_descriptions"
QUALS_TBL_NAME = "users_qualifications"

supabase: Client = create_client(DATABASE_URL, DATABASE_ANON)
LLM_MODEL = services.util.llm_agent.DocumentGenerationAgent()


def orchestrate_career_path(payload: dict) -> dict:
    """
    Orchestrates the career path intelligence pipeline:
    1. Assesses candidate viability.
    2. Dynamically selects a resume template strategy.
    3. Triggers remediation roadmap if gaps are identified.
    """
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


def create_user(payload): return supabase.auth.sign_up(payload)
def login(payload): return supabase.auth.sign_in_with_password(payload)
def logout(): supabase.auth.sign_out()

def get_jds(payload): return supabase.table(JD_TBL_NAME).select("*").eq("user_id", payload["user_id"]).execute()
def insert_jd(payload): return supabase.table(JD_TBL_NAME).insert(payload).execute()
def update_jd(payload): return supabase.table(JD_TBL_NAME).update(payload["update"]).eq("id", payload["id"]).execute()
def delete_jd(payload): return supabase.table(JD_TBL_NAME).delete().eq("id", payload["id"]).execute()

def get_quals(payload): return supabase.table(QUALS_TBL_NAME).select("*").eq("user_id", payload["user_id"]).execute()
def insert_quals(payload): return supabase.table(QUALS_TBL_NAME).insert(payload).execute()
def update_quals(payload): return supabase.table(QUALS_TBL_NAME).update(payload["update"]).eq("id", payload["id"]).execute()
def delete_quals(payload): return supabase.table(QUALS_TBL_NAME).delete().eq("id", payload["id"]).execute()


def discover_matching_jobs(payload: dict) -> dict:
    """Semantic Search: Vectorizes candidate profile and checks against Supabase."""
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
        return {"status": "error", "message": f"Semantic Search failed: {str(e)}"}

def refine_resume_bullets(payload: dict) -> dict:
    """Passes raw bullet points to the STAR refiner agent."""
    raw_bullets = payload.get("raw_bullets", [])
    return LLM_MODEL.refine_to_star_method(raw_bullets)

def benchmark_candidate(payload: dict) -> dict:
    """Requests market competitiveness benchmark for a candidate."""
    candidate_skills = payload.get("candidate_skills", [])
    target_role = payload.get("target_role", "")
    return LLM_MODEL.generate_benchmark(candidate_skills, target_role)

def persona_interview_agent(payload: dict) -> dict:
    """Triggers the multi-persona interview simulator."""
    target_role = payload.get("target_role", "")
    persona = payload.get("persona", "The Technical Lead")
    return LLM_MODEL.generate_persona_interview(target_role, persona)

def gap_agent(payload):
    skills = SkillGapInput(payload)
    auditor = FillableGapAgent() 
    return auditor.analyze_viability(skills.candidate_skills, skills.job_requirements)

def cover_letter_agent(payload):
    input = CoverLetterGenInput(payload)
    return LLM_MODEL.generate_cover_letter(input.candidate_skills, input.job_title, input.company_name)

def resume_agent(payload):
    input = ResumeGenInput(payload)
    return LLM_MODEL.generate_resume(
        input.candidate_name, input.candidate_skills, 
        input.experience_history, input.target_job_title
    )

def generate_bridge_roles(payload):
    return LLM_MODEL.generate_bridge_roles(
        candidate_skills=payload.get("candidate_skills", []),
        target_role=payload.get("target_role", "")
    )

def score_resume(payload):
    return LLM_MODEL.score_resume(
        current_resume_text=payload.get("current_resume_text", ""),
        target_job_description=payload.get("target_job_description", "")
    )

def generate_roadmap(payload):
    return LLM_MODEL.generate_learning_roadmap(
        missing_skills=payload.get("missing_skills", []),
        target_role=payload.get("target_role", ""),
        time_to_master_days=payload.get("time_to_master_days", 30)
    )