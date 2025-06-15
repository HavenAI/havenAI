
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.interval import IntervalTrigger
from datetime import datetime
import pytz

# Time-based (e.g. every morning at 9 AM UTC)
def morning_checkin_job(user_id):
    print(f"[{datetime.utcnow()}] Morning check-in for {user_id}")
    # You can trigger a chatbot message here

def schedule_daily_checkin(user_id):
    trigger = CronTrigger(hour=9, minute=0)  # 9:00 AM UTC
    scheduler.add_job(morning_checkin_job, trigger, args=[user_id], id=f"daily-checkin-{user_id}", replace_existing=True)

# Rule-based (pseudo logic for craving frequency)
def rule_based_trigger(user_id):
    print(f"[{datetime.utcnow()}] Evaluating rules for {user_id}")
    # 1. Query logs from MongoDB
    # 2. If high frequency, schedule chatbot nudge or reminder


scheduler = BackgroundScheduler(timezone="UTC")

def start_scheduler():
    scheduler.start()
