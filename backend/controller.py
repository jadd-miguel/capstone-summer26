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
