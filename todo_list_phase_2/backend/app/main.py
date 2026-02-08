from fastapi import FastAPI
from .routers import tasks_router
from .database import engine
from .models import User, Task  # Import models to register them
from sqlmodel import SQLModel


# Create the FastAPI app
app = FastAPI(
    title="Todo App API",
    description="REST API for multi-user todo application with JWT authentication",
    version="1.0.0"
)


# Include the task router
app.include_router(tasks_router)


@app.on_event("startup")
def on_startup():
    """Create database tables on startup."""
    SQLModel.metadata.create_all(engine)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo App API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)