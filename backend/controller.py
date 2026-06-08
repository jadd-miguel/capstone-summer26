from fastapi import FastAPI
import services.services as service
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:39392",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/create_user")
def create_user(payload: Dict):
    try:
        res = service.create_user(payload)
    except Exception as e:
        res = f"Error: {e}"
    return res

@app.post("/login")
def login(payload: Dict):
    try:
        res = service.login(payload)
    except Exception as e:
        res = f"Error: {e}"
    return res

@app.post("/logout")
def logout():
    try:
        service.logout()
        res = "Logout is Success"
    except Exception as e:
        res = f"Error: {e}"
    return res

@app.get("/jd")
def get_jds(payload: Dict):
    try:
        res = service.get_jds(payload)
    except Exception as e:
        res = f"Error: {e}"
    return res

@app.post("/jd")
def insert_jd(payload: Dict):
    try:
        res = service.insert_jd(payload)
    except Exception as e:
        res = f"Error: {e}"
    return res

@app.patch("/jd")
def update_jd(payload: Dict):
    try:
        res = service.update_jd(payload)
    except Exception as e:
        res = f"Error: {e}"
    return res

@app.delete("/jd")
def delete_jd(payload: Dict):
    try:
        res = service.delete_jd(payload)
    except Exception as e:
        res = f"Error: {e}"
    return res

@app.post("/gap_agent")
def gap_agent(payload: Dict):
    print("test")
    try:
        res = service.gap_agent(payload)
    except Exception as e:
        res = f"Error: {e}"
    return res
