from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from app.routes import logs, chat, onboarding, user

from fastapi.openapi.utils import get_openapi
from fastapi.security import HTTPBearer

from app.scheduler import start_scheduler

app = FastAPI(title="Haven AI Backend",
    version="0.1.0",
    description="API for craving logging, chat, and proactive support",
    openapi_tags=[
        {"name": "Logs", "description": "Logging endpoints"},
        {"name": "Chat", "description": "AI chat support"}
    ]

)

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Haven AI Backend",
        version="0.1.0",
        description="API for Haven AI with Firebase Authentication",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "HTTPBearer": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
    for path in openapi_schema["paths"]:
        for method in openapi_schema["paths"][path]:
            if "security" not in openapi_schema["paths"][path][method]:
                openapi_schema["paths"][path][method]["security"] = [{"HTTPBearer": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi




app.include_router(logs.router, prefix="/log", tags=["Logs"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(user.router, tags=["Users"])

@app.get("/")
def root():
    return {"message": "HAVEN AI Backend is running"}



app.include_router(onboarding.router, tags=["Onboarding"])


@app.on_event("startup")
def startup_event():
    start_scheduler()