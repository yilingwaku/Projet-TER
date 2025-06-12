from fastapi import APIRouter
from .routers.user_router import router as user_router
from .routers.ollama_router import router as ollama_router

router = APIRouter()

router.include_router(user_router, prefix="")
router.include_router(ollama_router, prefix="")