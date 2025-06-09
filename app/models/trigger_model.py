from pydantic import BaseModel
from typing import List
from datetime import datetime

class Trigger(BaseModel):
    user_id: str
    days: List[str]  # e.g., ["Mon", "Wed", "Fri"]
    craving_windows: List[str]  # ["16:00", "20:00"]
    preferred_prompt_lead_time: int  # in minutes
    active: bool
    created_by: str  # "user" or "ai"
    notes: str
