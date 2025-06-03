from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel,EmailStr
import fastapi
import httpx
import json
from typing import List,Optional

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

# Définir le modèle de données pour l'utilisateur
class User(BaseModel):
    email: EmailStr
    prenom: str
    id: str
    discussions: List = []
    notes: List = []
    agenda: List = []
    preventions: List = []
    reglages: List = []
    questionnaire: List = []

fake_users_db = [
    User(
        email="alice@example.com",
        prenom="Alice",
        id="1",
        discussions=[],
        notes=[],
        agenda=[],
        preventions=[],
        reglages=[],
        questionnaire=[]
    ),
    User(
        email="bob@example.com",
        prenom="Bob",
        id="2",
        discussions=[],
        notes=[],
        agenda=[],
        preventions=[],
        reglages=[],
        questionnaire=[]
    ),
]

# Definir la requête d'authentification
class AuthRequest(BaseModel):
    email: EmailStr

@app.post("/auth")
async def authenticate(request: AuthRequest):
    # Parcourir la liste des utilisateurs dans la base de données
    for user in fake_users_db:
        if user.email == request.email:
            # Si on trouve l'utilisateur, retourner ses informations
            return {
                "status": "success",
                "user": {
                    "id": user.id,
                    "prenom": user.prenom,
                    "email": user.email
                }
            }
    # si l'utilisateur n'est pas trouvé, retourner une erreur 404
    raise HTTPException(status_code=404, detail="Email not found")

# Fake données pour la mise à jour de l'utilisateu
fake_users_db2: List[User] = [
    User(email="alice@example.com", prenom="Alice", id="1"),
    User(email="bob@example.com", prenom="Bob", id="2"),
]

# PATCH /user 
# Mise à jour des informations de l'utilisateur
# email est obligatoire pour identifier l'utilisateur
class UserUpdateRequest(BaseModel):
    email: EmailStr              # 用于定位用户
    prenom: Optional[str] = None
    discussions: Optional[List] = None
    notes: Optional[List] = None
    agenda: Optional[List] = None
    preventions: Optional[List] = None
    reglages: Optional[List] = None
    questionnaire: Optional[List] = None

@app.patch("/user")
async def update_user(req: UserUpdateRequest):
    # Parcourir la liste des utilisateurs dans la base de données
    for user in enumerate(fake_users_db2):
        if user.email == req.email:
            # Clone l'utilisateur pour sauvegarder l'état original
            original = user.copy()

            # Mettre à jour les champs de l'utilisateur
            update_data = req.dict(exclude_unset=True, exclude={"email"})
            for field, value in update_data.items():
                setattr(user, field, value)

            # Mettre à jour l'utilisateur dans la base de données
            return {
                "status": "success",
                "original_user": original,
                "updated_user": user,
            }

    # si l'utilisateur n'est pas trouvé, retourner une erreur 404
    raise HTTPException(status_code=404, detail="Email not found")