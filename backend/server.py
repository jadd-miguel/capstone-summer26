from fastapi import FastAPI
import os
from supabase import create_client, Client

DATABASE_URL="https://yldvdgyehndhqchnvjis.supabase.co"
DATABASE_ANON="sb_publishable_kX5MogJvs5ekIrSr-v1rjQ_vqsUdaUd"

url: str = os.environ.get(DATABASE_URL)
key: str = os.environ.get(DATABASE_ANON)
supabase: Client = create_client(url, key)

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}
