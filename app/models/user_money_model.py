from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    quit_start_time: datetime
    daily_vape_usage: int
    cost_per_unit: float
    current_streak: int = 0
    longest_streak: int = 0
    badges: Optional[List[str]] = []
    vape_logs: Optional[List[datetime]] = []

class UserInDB(UserBase):
    id: str = Field(alias="_id")
    updated_at: datetime

class UserUpdate(BaseModel):
    quit_start_time: Optional[datetime]
    daily_vape_usage: Optional[int]
    cost_per_unit: Optional[float]
    current_streak: Optional[int]
    longest_streak: Optional[int]
    badges: Optional[List[str]]
    vape_logs: Optional[List[datetime]]

class UserProgress(BaseModel):
    days_quit: int
    money_saved: float
    current_streak: int
    longest_streak: int
    badges: List[str]
