from supabase import create_client, Client
from services.util.types import Skill_Gap_Input
import services.util.viability_engine
import services.util.llm_agent
import re

DATABASE_URL="https://yldvdgyehndhqchnvjis.supabase.co"
DATABASE_ANON="sb_publishable_kX5MogJvs5ekIrSr-v1rjQ_vqsUdaUd"
JD_TBL_NAME = "users_job_descriptions"

supabase: Client = create_client(DATABASE_URL, DATABASE_ANON)

ERROR_INDICATE = r"error"
class AUTHENTICATION_ERROR(Exception):
    pass

def is_error_msg(msg):
    print("error chk")
    if re.search(ERROR_INDICATE, msg.lower()):
        print("error is thrown")
        raise AUTHENTICATION_ERROR(msg)

def create_user(payload):
    res = supabase.auth.sign_up(payload)
    print("lala")
    is_error_msg(res)
    return res

def login(payload):
    res = supabase.auth.sign_in_with_password(payload)
    is_error_msg(res)
    return res

def logout():
    res = supabase.auth.sign_out()
    is_error_msg(res)

def get_jds(payload):
    user_id = payload["user_id"]
    res = supabase.table(JD_TBL_NAME).select("*").eq("user_id", user_id).execute()

    return res

def insert_jd(payload):
    res = supabase.table(JD_TBL_NAME).insert(payload).execute()
    return res

def update_jd(payload):
    id = payload["id"]
    update = payload["update"]
    res = supabase.table(JD_TBL_NAME).update(update).eq("id", id).execute()
    return res

def delete_jd(payload):
    id = payload["id"]
    res = supabase.table(JD_TBL_NAME).delete().eq("id", id).execute()
    return res

def gap_agent(payload):
    skills = Skill_Gap_Input(payload)
    gap_agent = services.util.viability_engine.FillableGapAgent() 

    res = gap_agent.analyze_viability(skills.candidate_skills, skills.job_requirements)
    return res

def llm_agent():
    llm_agent = services.util.llm_agent.DocumentGenerationAgent()

# res = llm_agent.generate_cover_letter(["Python", "SQL", "Pandas", "Jira", "Tableau"], "Software Developer", "Epson")
    candidate_name = "wembanyama"
    candidate_skills = ["Python", "SQL", "Pandas", "Jira", "Tableau"]
    experience_history= ["mechanic", "teacher"],
    target_job_title= "Alligator Tamer"

    res = llm_agent.generate_resume(candidate_name, candidate_skills, experience_history, target_job_title)

    return res

