import pytest
from datetime import datetime
from backend.app.models import Task


def test_task_creation():
    """Test creating a task with valid data."""
    task = Task(
        title="Test Task",
        description="Test Description",
        completed=False,
        user_id=1
    )

    assert task.title == "Test Task"
    assert task.description == "Test Description"
    assert task.completed is False
    assert task.user_id == 1
    assert task.id is None  # ID should be set by the database


def test_task_default_values():
    """Test that task has correct default values."""
    task = Task(
        title="Test Task",
        user_id=1
    )

    assert task.title == "Test Task"
    assert task.completed is False  # Default value
    assert task.user_id == 1