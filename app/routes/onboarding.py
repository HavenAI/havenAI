from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from app.firebase_auth import verify_token
from app.db import get_db
from app.models.user_model import OnboardingAnswers  # import your new model
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.scheduler import schedule_daily_checkin

router = APIRouter()
auth_scheme = HTTPBearer()

@router.post("/user/onboarding")
def save_onboarding(
    answers: OnboardingAnswers,
    credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)
):
    user_id = verify_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    db = get_db()
    db["users"].update_one(
        {"_id": user_id},
        {
            "$set": {
                "onboarding": {
                    "completed": True,
                    "submittedAt": datetime.utcnow(),
                    "answers": answers.dict()
                }
            }
        },
        upsert=True
    )
    schedule_daily_checkin(user_id)
    return {"message": "Onboarding saved successfully and check-in scheduled"}

@router.get("/user/onboarding")
def get_onboarding(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    db = get_db()
    user = db["users"].find_one({"_id.user_id": user_id['user_id']})
    if user and "onboarding" in user:
        return user["onboarding"]
    return {"message": "No onboarding data found"}
