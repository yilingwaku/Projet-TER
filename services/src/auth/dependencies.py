from fastapi import Depends, HTTPException
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from .jwt_handler import verify_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")  # chemin vers l'endpoint de login

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    payload = verify_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré")
    return payload["sub"]  # ici, "sub" = email