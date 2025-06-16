from pydantic import BaseModel, Field
from typing import List, Optional, Literal, Dict, Any
from enum import Enum
from datetime import datetime

class TonePreference(str, Enum):
    encouraging = "Encouraging"
    neutral = "Neutral"
    tough_love = "Tough Love"

class LoginMethod(str, Enum):
    google = "Google"
    email = "Email"
    phone = "Phone"
    anonymous = "Anonymous"

class QuizResults(BaseModel):
    score: int
    answers: List[Any]

class UserBase(BaseModel):
    user_id: str = Field(..., description="Firebase UID")
    quiz_results: QuizResults
    tone_preference: TonePreference
    login_method: LoginMethod
    goals: List[str]
    onboarding_complete: Optional[bool] = False

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    quiz_results: Optional[QuizResults]
    tone_preference: Optional[TonePreference]
    login_method: Optional[LoginMethod]
    goals: Optional[List[str]]
    onboarding_complete: Optional[bool]

class UserResponse(UserBase):
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True
        json_encoders = {datetime: lambda v: v.isoformat()}
