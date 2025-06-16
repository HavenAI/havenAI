from enum import Enum
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field, validator

class LogType(str, Enum):
    craving = "craving"
    vape = "vape"

class LogCreate(BaseModel):
    user_id: str
    type: LogType
    timestamp: datetime
    mood: str
    location: Optional[str] = None
    context: Optional[str] = None
    intensity: Optional[int] = Field(None, ge=1, le=10)

    @validator("intensity", always=True)
    def intensity_required_for_craving(cls, v, values):
        if values.get("type") == LogType.craving and v is None:
            raise ValueError("intensity is required for craving logs")
        return v

class LogResponse(LogCreate):
    id: str
    created_at: datetime
