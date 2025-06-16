from enum import Enum
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field, validator

class TriggerStatus(str, Enum):
    Pending = "Pending"
    Sent = "Sent"
    Skipped = "Skipped"
    Failed = "Failed"

class DeliveryMethod(str, Enum):
    Push = "Push"
    SMS = "SMS"
    Email = "Email"
    InApp = "In-App"

class TriggerCreate(BaseModel):
    user_id: str
    trigger_time: datetime
    reason: str
    status: TriggerStatus = TriggerStatus.Pending
    delivery_method: Optional[DeliveryMethod] = None
    prediction_source: Optional[str] = None
    notes: Optional[str] = None

    @validator("trigger_time")
    def trigger_time_must_be_future(cls, v):
        if v <= datetime.utcnow():
            raise ValueError("trigger_time must be in the future")
        return v

class TriggerResponse(TriggerCreate):
    created_at: datetime
    updated_at: datetime
    id: str = Field(..., alias="_id")

    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.replace(tzinfo=None).isoformat() + 'Z'}

class TriggerStatusUpdate(BaseModel):
    status: TriggerStatus
