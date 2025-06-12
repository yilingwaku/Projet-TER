from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ..models.ollama import PromptRequest
from ..controllers.ollama_controller import stream_ollama_response

router = APIRouter()

@router.post("/ask")
async def ask_model(request: PromptRequest):
    return StreamingResponse(stream_ollama_response(request), media_type="text/plain")