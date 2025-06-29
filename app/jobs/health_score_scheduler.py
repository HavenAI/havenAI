
from app.scheduler import scheduler  
from apscheduler.triggers.interval import IntervalTrigger
from app.jobs.health_update_logic import update_health_score_for_all_users
from datetime import timedelta

def schedule_health_score_update():
    scheduler.add_job(
        update_health_score_for_all_users,
        trigger=IntervalTrigger(days=3),
        id="health_score_update",
        replace_existing=True
    )
