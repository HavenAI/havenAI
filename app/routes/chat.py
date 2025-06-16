from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel
from app.db import db
from app.firebase_auth import verify_token
from datetime import datetime
from app.services.intervention_service import save_intervention

from app.services.chat_services import chat_response

router = APIRouter()
auth_scheme =  HTTPBearer()

class ChatInput(BaseModel):
    message: str

@router.post("/send")
async def send_chat(data: ChatInput, credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)
    reply = await chat_response(data.message, credentials)
    
    save_intervention({
    "user_id": user_id,
    "timestamp": datetime.utcnow(),
    "trigger_type": "manual",
    "prompt": data.message,
    "response": reply,
    "used_toolbox_strategy": False  # or True if applicable
    })


    return {"response": reply}


