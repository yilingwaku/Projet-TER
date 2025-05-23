from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fastapi
import httpx
import json
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "llama3.2:3b"
API_VERSION = "1.0.0-a"

class Message(BaseModel):
    role: str
    content: str

class PromptRequest(BaseModel):
    messages: List[Message]

@app.get("/")
async def root():
    return {
        "api_version": API_VERSION,
        "fastapi_version": fastapi.__version__,
        "model": MODEL_NAME
    }

@app.post("/ask")
async def ask_model(request: PromptRequest):
    payload = {
        "model": MODEL_NAME,
        "messages": [msg.dict() for msg in request.messages],
        "stream": True
    }

    async def stream_response():
        async with httpx.AsyncClient(timeout=None) as client:
            async with client.stream("POST", OLLAMA_URL, json=payload) as response:
                if response.status_code != 200:
                    raise HTTPException(status_code=response.status_code, detail=await response.aread())

                async for line in response.aiter_lines():
                    if not line.strip():
                        continue
                    try:
                        data = json.loads(line)
                        content = data.get("message", {}).get("content")
                        if content:
                            yield content
                    except json.JSONDecodeError:
                        continue

    return StreamingResponse(stream_response(), media_type="text/plain")