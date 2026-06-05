from viability_engine import FillableGapAgent
from fastapi import FastAPI, Request
from supabase import create_client, Client

DATABASE_URL="https://yldvdgyehndhqchnvjis.supabase.co"
DATABASE_ANON="sb_publishable_kX5MogJvs5ekIrSr-v1rjQ_vqsUdaUd"
supabase: Client = create_client(DATABASE_URL, DATABASE_ANON)

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/gap_agent")
async def gap_agent(request: Request):
    data = await request.json()

    candidate_skills = data["candidate_skills"]
    job_requirements = data["job_requirements"]

    gap_agent = FillableGapAgent() 

    return gap_agent.analyze_viability(candidate_skills, job_requirements)
