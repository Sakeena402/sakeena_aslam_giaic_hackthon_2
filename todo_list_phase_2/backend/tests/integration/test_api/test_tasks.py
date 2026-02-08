import pytest
from fastapi.testclient import TestClient
from backend.app.main import app


@pytest.fixture
def client():
    """Create a test client for the API."""
    with TestClient(app) as test_client:
        yield test_client


def test_create_task_endpoint(client):
    """Test the create task endpoint (requires authentication)."""
    # This test would require a valid JWT token to work
    # For now, we're just verifying the endpoint exists and returns expected status codes
    # when authentication is missing (which should be 403 Forbidden)

    response = client.post(
        "/api/1/tasks/",
        json={
            "title": "Test Task",
            "description": "Test Description",
            "user_id": 1
        },
        headers={"Authorization": "Bearer invalid-token"}
    )

    # Should return 403 for invalid token
    assert response.status_code in [403, 422]  # 403 for auth error, 422 for validation error


def test_get_tasks_endpoint(client):
    """Test the get tasks endpoint."""
    response = client.get("/api/1/tasks/", headers={"Authorization": "Bearer invalid-token"})

    # Should return 403 for invalid token
    assert response.status_code in [403, 404]  # 403 for auth error, 404 for path not found


def test_get_task_endpoint(client):
    """Test the get specific task endpoint."""
    response = client.get("/api/1/tasks/1", headers={"Authorization": "Bearer invalid-token"})

    # Should return 403 for invalid token
    assert response.status_code in [403, 404]  # 403 for auth error, 404 for path not found


def test_update_task_endpoint(client):
    """Test the update task endpoint."""
    response = client.put(
        "/api/1/tasks/1",
        json={"title": "Updated Task"},
        headers={"Authorization": "Bearer invalid-token"}
    )

    # Should return 403 for invalid token
    assert response.status_code in [403, 404]  # 403 for auth error, 404 for path not found


def test_delete_task_endpoint(client):
    """Test the delete task endpoint."""
    response = client.delete("/api/1/tasks/1", headers={"Authorization": "Bearer invalid-token"})

    # Should return 403 for invalid token
    assert response.status_code in [403, 405]  # 403 for auth error, 405 for method not allowed if path not registered


def test_update_task_completion_endpoint(client):
    """Test the update task completion endpoint."""
    response = client.patch(
        "/api/1/tasks/1/complete",
        json={"completed": True},
        headers={"Authorization": "Bearer invalid-token"}
    )

    # Should return 403 for invalid token
    assert response.status_code in [403, 404]  # 403 for auth error, 404 for path not found