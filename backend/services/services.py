from supabase import create_client, Client
from services.util.data_models import SkillGapInput, CoverLetterGenInput, ResumeGenInput
from services.util.viability_engine import FillableGapAgent
import services.util.llm_agent
import os
import requests
from dotenv import load_dotenv

DATABASE_URL="https://hygoffoliyjhxapyxoyr.supabase.co"
DATABASE_ANON="sb_publishable_lwjXFQ7Q1Eer-56Zk_OpYg_vB6bb135"
JD_TBL_NAME = "users_job_descriptions"
QUALS_TBL_NAME = "users_qualifications"

supabase: Client = create_client(DATABASE_URL, DATABASE_ANON)
LLM_MODEL = services.util.llm_agent.DocumentGenerationAgent()

load_dotenv()
ADZUNA_URL = "https://api.adzuna.com/v1/api"
ADZUNA_ID = os.getenv("ADZUNA_ID")
ADZUNA_KEY = os.getenv("ADZUNA_KEY")

def create_user(payload):
    return supabase.auth.sign_up(payload)

def login(payload):
    return supabase.auth.sign_in_with_password(payload)

def logout():
    supabase.auth.sign_out()

def get_jobs():
    headers = {
        "Accept": "application/json"
    }
    url = ADZUNA_URL + "/jobs/ca/search/1" + f"?app_id={ADZUNA_ID}" + f"&app_key={ADZUNA_KEY}"
    res = requests.get(url, headers=headers)
    return res.json()

def get_jds(payload):
    user_id = payload["user_id"]
    return supabase.table(JD_TBL_NAME).select("*").eq("user_id", user_id).execute()

def insert_jd(payload):
    return supabase.table(JD_TBL_NAME).insert(payload).execute()

def update_jd(payload):
    id = payload["id"]
    update = payload["update"]
    return supabase.table(JD_TBL_NAME).update(update).eq("id", id).execute()

def delete_jd(payload):
    id = payload["id"]
    return supabase.table(JD_TBL_NAME).delete().eq("id", id).execute()

def get_quals(payload):
    user_id = payload["user_id"]
    return supabase.table(QUALS_TBL_NAME).select("*").eq("user_id", user_id).execute()

def insert_quals(payload):
    return supabase.table(QUALS_TBL_NAME).insert(payload).execute()

def update_quals(payload):
    id = payload["id"]
    update = payload["update"]
    return supabase.table(QUALS_TBL_NAME).update(update).eq("id", id).execute()

def delete_quals(payload):
    id = payload["id"]
    return supabase.table(QUALS_TBL_NAME).delete().eq("id", id).execute()

def gap_agent(payload):
    skills = SkillGapInput(payload)
    gap_agent = FillableGapAgent() 
    return gap_agent.analyze_viability(
        skills.candidate_skills,
        skills.job_requirements
    )

def cover_letter_agent(payload):
    input = CoverLetterGenInput(payload)
    return LLM_MODEL.generate_cover_letter(
        input.candidate_skills,
        input.job_title,
        input.company_name
    )

def resume_agent(payload):
    input = ResumeGenInput(payload)
    return LLM_MODEL.generate_resume(
        input.candidate_name,
        input.candidate_skills,
        input.experience_history,
        input.target_job_title
    )

def generate_interview(payload):
    return LLM_MODEL.generate_interview_script(
        candidate_skills=payload.get("candidate_skills", []),
        missing_skills=payload.get("missing_skills", []),
        job_title=payload.get("job_title", "")
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
        time_to_master_days=payload.get("time_to_master_days", 0)
    )

def generate_bridge_roles(payload):
    return LLM_MODEL.generate_bridge_roles(
        candidate_skills=payload.get("candidate_skills", []),
        target_role=payload.get("target_role", "")
    )
