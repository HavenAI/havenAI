from pydantic import BaseModel
from datetime import datetime

class Intervention(BaseModel):
    user_id: str
    timestamp: datetime
    trigger_type: str  # "manual" or "scheduled"
    prompt: str
    response: str
    used_toolbox_strategy: bool
