from fastapi import HTTPException
from ..models.user import User, UserRequest
from ..auth.jwt_handler import create_access_token
from typing import List

from ..datas.user import users_db

# Fonction pour gérer la connexion d'un utilisateur
def login_user(request: UserRequest):
    for user in users_db:
        if user.email == request.email:
            token = create_access_token({"sub": user.email})
            return {
                "status": "success",
                "token": token,
                "user": user.model_dump(exclude={"id"})
            }
    raise HTTPException(status_code=404, detail="Email not found")

# Fonction pour obtenir les informations d'un utilisateur
def get_user_info(email: str):
    for user in users_db:
        if user.email == email:
            return {
                "status": "success",
                "user": user.model_dump(exclude={"id"})
            }
    raise HTTPException(status_code=404, detail="User not found")

# Fonction pour créer un nouvel utilisateur
def create_user_info(request: UserRequest):
    for user in users_db:
        if user.email == request.email:
            raise HTTPException(status_code=400, detail="Email already exists")
        
        if not request.email or not request.name:
            raise HTTPException(status_code=400, detail="Email and name are required")

    new_id = str(len(users_db) + 1)

    new_user = User(
        email=request.email,
        name=request.name,
        id=new_id,
        discussions=request.discussions or [],
        notes=request.notes or [],
        agenda=request.agenda or [],
        preventions=request.preventions or [],
        reglages=request.reglages or [{"textToSpeechEnabled": True, "sharePersonalData": True}],
        questionnaire=request.questionnaire or []
    )

    users_db.append(new_user)
    token = create_access_token({"sub": new_user.email})

    return {
        "status": "success",
        "token": token,
        "user": new_user
    }

# Fonction pour mettre à jour les informations d'un utilisateur
def update_user_info(request: UserRequest, email: str):
    for idx, user in enumerate(users_db):
        if user.email == email:
            original = user.model_copy()
            update_data = request.model_dump(exclude_unset=True, exclude={"email"})
            for field, value in update_data.items():
                setattr(user, field, value)
            users_db[idx] = user
            return {
                "status": "success",
                "user": user
            }
    raise HTTPException(status_code=404, detail="Email not found")