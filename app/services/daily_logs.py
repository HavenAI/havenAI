from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.db import get_db
from app.firebase_auth import verify_token
from datetime import datetime
from typing import Dict
from typing import List, Dict, Any


def get_daily_checkin_data(credentials: HTTPAuthorizationCredentials) -> Dict:
    user = verify_token(credentials.credentials)
    if not user:
        raise HTTPException(
            status_code=401,
            detail = "Invalid Token"
        )
    
    db = get_db()
    now = datetime.utcnow()
    start_of_day = datetime(now.year, now.month, now.day)

    today_logs_cursor = db["logs"].find({
        "user_id": user["user_id"],
        "timestamp": {"$gte": start_of_day}
    })

    today_logs = today_logs_cursor.to_list(length=None)

    cravings = [log for log in today_logs if log["type"] == "craving"]
    vapes = [log for log in today_logs if log["type"] == "vape"]
    
    all_moods = [log["mood"] for log in today_logs if "mood" in log and log["mood"]]
    unique_moods = list(set(all_moods))
    cravings_intensity = [
        log["intensity"] for log in cravings
        if "intensity" in log and isinstance(log["intensity"], int)
    ]

    avg_craving_intensity = round(
        sum(cravings_intensity) / len(cravings_intensity), 1
    ) if cravings_intensity else None

    if today_logs:
        latest_log = max(log["timestamp"] for log in today_logs)
        time_since_last_log = (now - latest_log).total_seconds() / 60

    else:
        time_since_last_log = None

    return {
        "cravings_today": len(cravings),
        "vapes_today": len(vapes),
        "list_of_moods": unique_moods,
        "avg_craving_intensity": avg_craving_intensity,
        "time_since_last_log_mins": round(time_since_last_log, 1) if time_since_last_log else None
    }



def calculate_progress(entries: List[Dict[str, Any]]) -> Dict[str, Any]:
    if not entries:
        return {
            "days_logged": 0,
            "lung_recovery": 0,
            "bp_improvement": 0,
            "avg_craving_intensity": None
        }
    # Find earliest and latest log
    timestamps = []
    craving_intensities = []
    for entry in entries:
        if entry.get("type") == "craving":
            craving_intensities.append(entry.get("intensity", 0))
            ts = entry.get("timestamp")
        elif entry.get("type") == "vape_session":
            ts = entry.get("session_datetime")
        else:
            continue
        if isinstance(ts, str):
            try:
                ts = datetime.fromisoformat(ts)
            except Exception:
                continue
        timestamps.append(ts)
    if not timestamps:
        return {
            "days_logged": 0,
            "lung_recovery": 0,
            "bp_improvement": 0,
            "avg_craving_intensity": None
        }
    first_log = min(timestamps)
    last_log = max(timestamps)
    days_logged = (last_log - first_log).days + 1
    # Generic formulas
    lung_recovery = min(100, days_logged * 2)  # 2% per day, max 100%
    bp_improvement = min(100, days_logged * 3)  # 3% per day, max 100%
    avg_craving_intensity = (
        sum(craving_intensities) / len(craving_intensities)
        if craving_intensities else None
    )
    return {
        "days_logged": days_logged,
        "lung_recovery": lung_recovery,
        "bp_improvement": bp_improvement,
        "avg_craving_intensity": avg_craving_intensity
    }


