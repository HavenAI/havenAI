from fastapi import FastAPI
from app.logs import router as logs_router

app = FastAPI()

app.include_router(logs_router)
