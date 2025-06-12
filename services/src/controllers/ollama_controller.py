import httpx
import json
from fastapi import HTTPException
from ..models.ollama import PromptRequest

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "llama3.2:3b"

async def stream_ollama_response(request: PromptRequest):
    payload = {
        "model": MODEL_NAME,
        "messages": [msg.dict() for msg in request.messages],
        "stream": True
    }

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
                except Exception as e:
                    raise HTTPException(status_code=500, detail=f"Error processing response: {str(e)}")