from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.database import connect_to_mongo, close_mongo_connection
from app.routers import cravings, vape_sessions

app = FastAPI(
    title="Haven AI API",
    description="API for tracking cravings and vape sessions",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": f"An error occurred: {str(exc)}"}
    )

# Register startup and shutdown events
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    print("Connected to MongoDB!")

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()
    print("Disconnected from MongoDB!")

@app.get("/")
async def root():
    return {"message": "Welcome to Haven API"}

app.include_router(cravings.router, prefix="/cravings", tags=["Cravings"])
app.include_router(vape_sessions.router, prefix="/vape-sessions", tags=["Vape Sessions"])
