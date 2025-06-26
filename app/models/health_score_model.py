from pydantic import BaseModel
from datetime import datetime




class InitialHealth(BaseModel):
    mental_health: int
    lung_functionality: int
    heart_health: int
    initialized: bool = False

class LatestHealth(BaseModel):
    latest_mental_health: int
    latest_lung_functionality: int
    latest_heart_health: int


class HealthScore(BaseModel):
    initial_healthscore: InitialHealth
    latest_healthscore: LatestHealth