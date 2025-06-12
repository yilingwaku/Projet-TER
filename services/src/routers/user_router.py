from fastapi import APIRouter, Depends
from ..models.user import UserRequest
from ..controllers.user_controller import login_user, get_user_info, create_user_info, update_user_info
from ..auth.dependencies import get_current_user
from typing import Annotated

router = APIRouter()

@router.post("/login")
async def login(request: UserRequest):
    return login_user(request)

@router.get("/verify")
async def verify_token(user_email: Annotated[str, Depends(get_current_user)]):
    return get_user_info(user_email)

@router.post("/user")
async def create_user(request: UserRequest):
    return create_user_info(request)

@router.patch("/user")
async def update_user(request: UserRequest, user_email: Annotated[str, Depends(get_current_user)]):
    return update_user_info(request, user_email)