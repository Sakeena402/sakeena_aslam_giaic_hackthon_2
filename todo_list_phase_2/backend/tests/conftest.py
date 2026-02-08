import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.database import get_session
from backend.app.main import app


@pytest.fixture(scope="module")
def test_app():
    """Create a test app instance."""
    yield app


@pytest.fixture(scope="module")
def client(test_app):
    """Create a test client."""
    from fastapi.testclient import TestClient
    return TestClient(test_app)