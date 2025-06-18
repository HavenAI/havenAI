from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel
from app.firebase_auth import verify_token
from app.services.daily_checkin_service import checkin_response

router = APIRouter()
auth_scheme = HTTPBearer()

class CheckinInput(BaseModel):
    message:str




@router.post("/send")
async def daily_checkin_chat( data: CheckinInput, credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail = "Invalid Token"
        )
    reply = await checkin_response(data.message, credentials)
    return {"response" : reply}