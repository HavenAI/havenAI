from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LogEntry(BaseModel):
    user_id: str
    type: str  # "craving", "vape", or "nrt"
    timestamp: datetime
    mood: Optional[str]
    location: Optional[str]
    intensity: Optional[int]  # For craving
    nrt_type: Optional[str]
    dosage_mg: Optional[float]
