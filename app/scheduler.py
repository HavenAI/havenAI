from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
from pymongo import MongoClient
from app.config import settings

import pytz

# MongoDB connection
client = MongoClient(settings.MONGO_URI)
db = client["haven"]
users_collection = db["users"]

# Time-based check-in job
def morning_checkin_job(user_id):
    print(f"[{datetime.utcnow()}] Scheduled check-in for {user_id}")
    db.checkin_flags.insert_one({
        "user_id": user_id,
        "timestamp": datetime.utcnow(),
        "status": "pending",
        "type": "time_based"
    })


# Schedule check-ins based on user preference
def schedule_checkins_from_onboarding():
    users = users_collection.find({"onboarding.checkInFrequency": {"$exists": True}})
    
    for user in users:
        user_id = user["_id"]
        frequency = user["onboarding"].get("checkInFrequency", "1 time")

        times = []
        if frequency == "1 time":
            times = ["08:00"]
        elif frequency == "2 times":
            times = ["08:00", "20:00"]
        elif frequency == "3 times":
            times = ["08:00", "14:00", "20:00"]

        for i, time in enumerate(times):
            hour, minute = map(int, time.split(":"))
            trigger = CronTrigger(hour=hour, minute=minute)
            scheduler.add_job(
                morning_checkin_job,
                trigger,
                args=[user_id],
                id=f"checkin-{user_id}-{i}",
                replace_existing=True
            )

# Rule-based (pseudo logic for craving frequency)
def rule_based_trigger(user_id):
    print(f"[{datetime.utcnow()}] Evaluating rules for {user_id}")
    # Add your logic here

scheduler = BackgroundScheduler(timezone="UTC")

def schedule_daily_checkin():
    scheduler.start()
    schedule_checkins_from_onboarding()

