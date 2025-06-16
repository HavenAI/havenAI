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

<<<<<<< HEAD
@router.post("/send")
async def send_chat(data: ChatInput, credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)
    reply = await chat_response(data.message, credentials)
=======
@router.post("/send", dependencies=[Depends(firebase_auth_dependency)])
async def send_chat(data: ChatInput, request: Request):
    user = request.state.user
    print(data.message)
    # Basic OpenAI call
    openai.api_key = "openai-key"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You're a motivational quit-vaping coach."},
            {"role": "user", "content": data.message}
        ]
    )

    reply = response['choices'][0]['message']['content']
>>>>>>> 4d3a7ed (added new GET endpoint to get user Nickname)
    
    save_intervention({
    "user_id": user_id,
    "timestamp": datetime.utcnow(),
    "trigger_type": "manual",
    "prompt": data.message,
    "response": reply,
    "used_toolbox_strategy": False  # or True if applicable
    })


    return {"response": reply}


