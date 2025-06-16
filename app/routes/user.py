from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from app.firebase_auth import verify_token
from app.db import get_db
from app.models.user_model import OnboardingAnswers  # import your new model
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

router = APIRouter()
auth_scheme = HTTPBearer()

@router.get("/user")
def get_onboarding(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    db = get_db()
    user = db["users"].find_one({"_id.user_id": user_id['user_id']})
    print(user)

    print(user["onboarding"]["answers"]["nickname"])
    if user and "onboarding" in user:
        print(user["onboarding"]["answers"]["nickname"])
        return user["onboarding"]["answers"]["nickname"]
    return {"message": "No nickname found"}