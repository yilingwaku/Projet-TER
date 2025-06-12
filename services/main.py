from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.router import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
async def root():
    return {
        "status": "success",
        "api_version": "1.0.0-a",
        "fastapi_version": "0.110.0",
        "model": "llama3.2:3b"
    }