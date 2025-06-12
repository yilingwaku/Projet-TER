from pydantic import BaseModel, EmailStr
from typing import List, Optional

class User(BaseModel):
    id: str
    email: EmailStr
    name: str
    discussions: List = []
    notes: List = []
    agenda: List = []
    preventions: List = []
    reglages: List = []
    questionnaire: List = []

class UserRequest(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    discussions: Optional[List] = None
    notes: Optional[List] = None
    agenda: Optional[List] = None
    preventions: Optional[List] = None
    reglages: Optional[List] = None
    questionnaire: Optional[List] = None