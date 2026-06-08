from supabase import create_client, Client
from services.util.types import Skill_Gap_Input
import services.util.viability_engine

DATABASE_URL="https://yldvdgyehndhqchnvjis.supabase.co"
DATABASE_ANON="sb_publishable_kX5MogJvs5ekIrSr-v1rjQ_vqsUdaUd"
JD_TBL_NAME = "users_job_descriptions"

supabase: Client = create_client(DATABASE_URL, DATABASE_ANON)

def create_user(payload):
    res = supabase.auth.sign_up(payload)
    return res

def login(payload):
    res = supabase.auth.sign_in_with_password(payload)
    return res

def logout():
    supabase.auth.sign_out()

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
