from fastapi import FastAPI
from supabase import create_client, Client

DATABASE_URL="https://yldvdgyehndhqchnvjis.supabase.co"
DATABASE_ANON="sb_publishable_kX5MogJvs5ekIrSr-v1rjQ_vqsUdaUd"
supabase: Client = create_client(DATABASE_URL, DATABASE_ANON)

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}
