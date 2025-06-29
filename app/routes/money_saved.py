from fastapi import APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from datetime import datetime, timezone, timedelta
from app.models.user_money_model import UserInDB, UserUpdate, UserProgress
from app.db import get_db

router = APIRouter()

db = get_db()
users_collection = db["users"]

@router.get("/")
def read_root():
    return {"message": "Money Saved API is running"}

@router.get("/progress/{user_id}", response_model=UserProgress)
def get_progress(user_id: str):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user = UserInDB(**user)
    now = datetime.now(timezone.utc)
    days_since_quit = (now - user.quit_start_time).days
    vape_logs = user.vape_logs or []
    vape_days = set([dt.date() for dt in vape_logs])
    all_days = [(user.quit_start_time + timedelta(days=i)).date() for i in range(days_since_quit)]
    clean_days = [d for d in all_days if d not in vape_days]
    days_quit = len(clean_days)
    money_saved = days_quit * user.daily_vape_usage * user.cost_per_unit

    # --- Streak logic ---
    current_streak = user.current_streak or 0
    longest_streak = user.longest_streak or 0
    if days_quit > current_streak:
        current_streak = days_quit
        if current_streak > longest_streak:
            longest_streak = current_streak
        users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"current_streak": current_streak, "longest_streak": longest_streak, "updated_at": now}})

    # --- Badges logic ---
    badges = user.badges or []
    # Example: Money saved badge
    if money_saved >= 1000 and "First ₹1000 Saved" not in badges:
        badges.append("First ₹1000 Saved")
    # Example: Craving Resisted Champion (if longest_streak > 7)
    if longest_streak >= 7 and "Craving Resisted Champion" not in badges:
        badges.append("Craving Resisted Champion")
    users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"badges": badges, "updated_at": now}})

    return UserProgress(
        days_quit=days_quit,
        money_saved=money_saved,
        current_streak=current_streak,
        longest_streak=longest_streak,
        badges=badges
    )

@router.put("/users/{user_id}")
def update_user(user_id: str, update: UserUpdate):
    now = datetime.now(timezone.utc)
    update_dict = update.dict(exclude_unset=True)
    update_dict["updated_at"] = now
    result = users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"msg": "User updated"}
