from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.firebase_auth import verify_token
from email.message import EmailMessage
import aiosmtplib
import os

router = APIRouter()
auth_scheme = HTTPBearer()

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")
RECIPIENTS = ["zmkulo@gmail.com", "yingyingcai2019@gmail.com"]

@router.post("/feedback")
async def send_feedback(feedback: dict, credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid Token")

    message = EmailMessage()
    message["From"] = SENDER_EMAIL
    message["To"] = ", ".join(RECIPIENTS)
    message["Subject"] = "New App Feedback"
    message.set_content(f"User ID: {user_id}\n\nMessage:\n{feedback.get('message', '')}\n\nRating: {feedback.get('rating', 'N/A')}")

    

    try:
        await aiosmtplib.send(
            message,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            start_tls=True,
            username=SENDER_EMAIL,
            password=SENDER_PASSWORD,
        )
        return {"detail": "Feedback sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
