from fastapi import APIRouter, Depends, HTTPException, FastAPI
from datetime import datetime
from app.firebase_auth import verify_token
from app.db import get_db
from app.models.user_model import OnboardingAnswers  # import your new model
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.services.user_quiz import get_quiz_data
from firebase_admin import auth, initialize_app


router = APIRouter()
auth_scheme = HTTPBearer()


@router.get("/user/answers")
def get_answers(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    data = get_quiz_data(credentials)
    return data


@router.get("/user/{uid}")
def get_user_details(uid: str):
    user = auth.get_user(uid)
    print(uid)
    print(user)
    return {
        "uid": user.uid,
        "email": user.email,
        "created_at": user.user_metadata.creation_timestamp,
        "last_sign_in": user.user_metadata.last_sign_in_timestamp
}
