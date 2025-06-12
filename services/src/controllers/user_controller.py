from fastapi import HTTPException
from ..models.user import User, UserRequest
from ..auth.jwt_handler import create_access_token
from typing import List

# Données factices
users_db: List[User] = [
    User(
        id="1",
        email="alice@example.com",
        name="Alice",
        reglages= [{
            "textToSpeechEnabled": False,
            "sharePersonalData": True,
        }],
        discussions=[{"id":"6d3e8241-6bc2-42f9-b7df-c619ef3c408d","messages":[{"role":"user","content":"Quels sont les risques domestiques qui apparaissent avec l'âge ?"},{"role":"assistant","content":"Les risques domestiques liés à l'âge incluent une augmentation du risque d'accidents et de blessures chez les personnes âgées. Parmi ceux-ci, on peut citer :\n\n* Les chutes en raison de problèmes de mobilité ou de vision,\n* Les troubles de la marche qui rendent difficile la navigation dans des surfaces non régulières,\n* Des accidents liés à la manipulation de produits domestiques avec des griffes raccordées,\n* Des problèmes respiratoires causés par les fumées des cordes électriques ou des feux de cheminée sans surveillance.\n\nCes risques peuvent être atténués en améliorant la sécurité de l'environnement et en mettant en place des mesures préventives adaptées."}]}],
        notes=[],
        agenda=[],
        preventions=[],
        questionnaire=[]
    ),
]

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