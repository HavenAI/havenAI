from fastapi import APIRouter,Depends,HTTPException,status
from app.firebase_auth import verify_token
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.db import get_db
from app.models.rating_model import RatingEntry
from datetime import datetime

router = APIRouter()
auth_scheme = HTTPBearer()

@router.post('/user/rating')
def save_rating(rating_data: RatingEntry, credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user = verify_token(credentials.credentials)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )
    db = get_db()
    db["rating"].insert_one(
        {
        "user_id": user["user_id"],
        "rating": rating_data.star_ratings,
        "timestamp": datetime.utcnow() 
        }
    )
    return {"message": "Rating saved successfully"}