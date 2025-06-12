from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    role: str
    content: str

class PromptRequest(BaseModel):
    messages: List[Message]