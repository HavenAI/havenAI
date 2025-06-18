from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from app.firebase_auth import verify_token
from app.db import get_db
from app.models.user_model import OnboardingAnswers  # import your new model
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.services.user_quiz import get_quiz_data

router = APIRouter()
auth_scheme = HTTPBearer()

@router.get("/user/answers")
def get_answers(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    data = get_quiz_data(credentials)
    print(data)
    return data