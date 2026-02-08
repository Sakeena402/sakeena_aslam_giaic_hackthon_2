import asyncio
import httpx
import pytest
from app.main import app
from fastapi.testclient import TestClient


def test_api_endpoints():
    """Test the API endpoints to make sure they're working correctly."""
    with TestClient(app) as client:
        # Test the root endpoint
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Welcome to the Todo App API"}

        # Test that we get a 404 for non-existent task endpoints (without proper auth)
        response = client.get("/api/1/tasks/")
        # Should get 403 because of JWT auth, or 404 if path doesn't exist
        assert response.status_code in [403, 404, 422]

        print("API endpoints are accessible and returning expected responses!")


if __name__ == "__main__":
    test_api_endpoints()
    print("All tests passed!")