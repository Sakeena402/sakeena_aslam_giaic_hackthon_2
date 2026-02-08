from sqlmodel import create_engine, Session
from .config import settings
import os


def get_session():
    with Session(engine) as session:
        yield session


# Use the configured database URL from .env file
# This will connect to your Neon PostgreSQL database
engine = create_engine(settings.database_url, echo=True)