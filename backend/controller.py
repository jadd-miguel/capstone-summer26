from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import services.services as service
from typing import Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/create_user")
def create_user(payload: Dict):
    try:
        return service.create_user(payload)
    except Exception as e:
        status = getattr(e, "status")
        code = getattr(e, "code")
        raise HTTPException(
            status_code=int(status),
            detail = f"{code} | {e}"
        )

@app.post("/login")
def login(payload: Dict):
    try:
        return service.login(payload)
    except Exception as e:
        status = getattr(e, "status")
        code = getattr(e, "code")
        raise HTTPException(
            status_code=int(status),
            detail = f"{code} | {e}"
        )

@app.post("/logout")
def logout():
    try:
        service.logout()
        return "Logout is Success"
    except Exception as e:
        status = getattr(e, "status")
        code = getattr(e, "code")
        raise HTTPException(
            status_code=int(status),
            detail = f"{code} | {e}"
        )

@app.get("/jd")
def get_jds(payload: Dict):
    try:
        return service.get_jds(payload)
    except Exception as e:
        code = getattr(e, "code")
        hint = getattr(e, "hint")
        raise HTTPException(
            status_code=500,
            detail = f"{code} | {hint} | {e}"
        )

@app.post("/jd")
def insert_jd(payload: Dict):
    try:
        return service.insert_jd(payload)
    except Exception as e:
        code = getattr(e, "code")
        hint = getattr(e, "hint")
        raise HTTPException(
            status_code=500,
            detail = f"{code} | {hint} | {e}"
        )

@app.patch("/jd")
def update_jd(payload: Dict):
    try:
        return service.update_jd(payload)
    except Exception as e:
        code = getattr(e, "code")
        hint = getattr(e, "hint")
        raise HTTPException(
            status_code=500,
            detail = f"{code} | {hint} | {e}"
        )

@app.delete("/jd")
def delete_jd(payload: Dict):
    try:
        return service.delete_jd(payload)
    except Exception as e:
        code = getattr(e, "code")
        hint = getattr(e, "hint")
        raise HTTPException(
            status_code=500,
            detail = f"{code} | {hint} | {e}"
        )
    
@app.get("/quals")
def get_quals(payload: Dict):
    try:
        return service.get_quals(payload)
    except Exception as e:
        code = getattr(e, "code")
        hint = getattr(e, "hint")
        raise HTTPException(
            status_code=500,
            detail = f"{code} | {hint} | {e}"
        )

@app.post("/quals")
def insert_quals(payload: Dict):
    try:
        return service.insert_quals(payload)
    except Exception as e:
        code = getattr(e, "code")
        hint = getattr(e, "hint")
        raise HTTPException(
            status_code=500,
            detail = f"{code} | {hint} | {e}"
        )

@app.patch("/quals")
def update_quals(payload: Dict):
    try:
        return service.update_quals(payload)
    except Exception as e:
        code = getattr(e, "code")
        hint = getattr(e, "hint")
        raise HTTPException(
            status_code=500,
            detail = f"{code} | {hint} | {e}"
        )

@app.delete("/quals")
def delete_quals(payload: Dict):
    try:
        return service.delete_quals(payload)
    except Exception as e:
        code = getattr(e, "code")
        hint = getattr(e, "hint")
        raise HTTPException(
            status_code=500,
            detail = f"{code} | {hint} | {e}"
        )

@app.post("/gap_agent")
def gap_agent(payload: Dict):
    try:
        return service.gap_agent(payload)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail = f"{e}"
        )

@app.post("/cover_letter_agent")
def cover_letter_agent(payload: Dict = None):
    try:
        return service.cover_letter_agent(payload)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail = f"{e}"
        )

@app.post("/resume_agent")
def resume_agent(payload: Dict = None):
    try:
        return service.resume_agent(payload)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail = f"{e}"
        )

@app.post("/generate_interview")
def generate_interview(payload: Dict = None):
    try:
        return service.generate_interview(payload)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail = f"{e}"
        )

@app.post("/score_resume")
def score_resume(payload: Dict = None):
    try:
        return service.score_resume(payload)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail = f"{e}"
        )

@app.post("/generate_roadmap")
def generate_roadmap(payload: Dict = None):
    try:
        return service.generate_roadmap(payload)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail = f"{e}"
        )

@app.post("/generate_bridge_roles")
def generate_bridge_roles(payload: Dict = None):
    try:
        return service.generate_bridge_roles(payload)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail = f"{e}"
        )

@app.post("/discover_jobs")
def discover_jobs(payload: Dict):
    """Semantic Vector Search for matching jobs."""
    try:
        return service.discover_matching_jobs(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Semantic Search Error: {e}")

@app.post("/refine_bullets")
def refine_bullets(payload: Dict):
    """Converts raw resume bullets into the STAR method."""
    try:
        return service.refine_resume_bullets(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"STAR Refiner Error: {e}")

@app.post("/benchmark_candidate")
def benchmark_candidate(payload: Dict):
    """Generates market competitiveness and salary leverage."""
    try:
        return service.benchmark_candidate(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Benchmarking Error: {e}")

@app.post("/persona_interview")
def persona_interview(payload: Dict):
    """Generates a dynamic interview script based on interviewer persona."""
    try:
        return service.persona_interview_agent(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Persona Interview Error: {e}")