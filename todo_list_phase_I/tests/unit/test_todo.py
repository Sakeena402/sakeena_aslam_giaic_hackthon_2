"""
Unit tests for the todo module.
Tests the Task and TodoList classes functionality.
"""

import pytest
from src.todo import Task, TodoList


class TestTask:
    """Test cases for the Task class."""

    def test_create_task_with_valid_data(self):
        """Test creating a task with valid data."""
        task = Task(task_id=1, title="Test Task", description="Test Description", completed=False)
        assert task.id == 1
        assert task.title == "Test Task"
        assert task.description == "Test Description"
        assert task.completed is False

    def test_create_task_with_empty_title_raises_error(self):
        """Test that creating a task with empty title raises ValueError."""
        with pytest.raises(ValueError, match="Task title cannot be empty"):
            Task(task_id=1, title="", description="Test Description")

    def test_create_task_with_whitespace_only_title_raises_error(self):
        """Test that creating a task with whitespace-only title raises ValueError."""
        with pytest.raises(ValueError, match="Task title cannot be empty"):
            Task(task_id=1, title="   ", description="Test Description")

    def test_task_string_representation(self):
        """Test the string representation of a task."""
        task = Task(task_id=1, title="Test Task", description="Test Description")
        expected = "[○] 1. Test Task - Test Description"
        assert str(task) == expected

    def test_task_string_representation_without_description(self):
        """Test the string representation of a task without description."""
        task = Task(task_id=1, title="Test Task")
        expected = "[○] 1. Test Task"
        assert str(task) == expected

    def test_task_completion_status(self):
        """Test task completion status in string representation."""
        completed_task = Task(task_id=1, title="Test Task", completed=True)
        pending_task = Task(task_id=2, title="Test Task", completed=False)
        assert "[✓]" in str(completed_task)
        assert "[○]" in str(pending_task)


class TestTodoList:
    """Test cases for the TodoList class."""

    def test_add_task_successfully(self):
        """Test adding a task successfully."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Test Task")
        assert task_id == 1
        assert 1 in todo_list.tasks
        assert todo_list.tasks[1].title == "Test Task"
        assert todo_list.tasks[1].completed is False

    def test_add_task_with_description(self):
        """Test adding a task with description."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Test Task", "Test Description")
        assert task_id == 1
        assert todo_list.tasks[1].description == "Test Description"

    def test_add_task_with_empty_title_raises_error(self):
        """Test that adding a task with empty title raises ValueError."""
        todo_list = TodoList()
        with pytest.raises(ValueError, match="Task title cannot be empty"):
            todo_list.add_task("")

    def test_add_task_with_whitespace_only_title_raises_error(self):
        """Test that adding a task with whitespace-only title raises ValueError."""
        todo_list = TodoList()
        with pytest.raises(ValueError, match="Task title cannot be empty"):
            todo_list.add_task("   ")

    def test_get_task_successfully(self):
        """Test getting a task by ID."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Test Task")
        task = todo_list.get_task(task_id)
        assert task is not None
        assert task.id == task_id
        assert task.title == "Test Task"

    def test_get_nonexistent_task_returns_none(self):
        """Test getting a non-existent task returns None."""
        todo_list = TodoList()
        task = todo_list.get_task(999)
        assert task is None

    def test_update_task_successfully(self):
        """Test updating a task successfully."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Old Title", "Old Description")

        success = todo_list.update_task(task_id, "New Title", "New Description")
        assert success is True
        assert todo_list.tasks[task_id].title == "New Title"
        assert todo_list.tasks[task_id].description == "New Description"

    def test_update_task_title_only(self):
        """Test updating only the title of a task."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Old Title", "Old Description")

        success = todo_list.update_task(task_id, "New Title")
        assert success is True
        assert todo_list.tasks[task_id].title == "New Title"
        assert todo_list.tasks[task_id].description == "Old Description"

    def test_update_task_description_only(self):
        """Test updating only the description of a task."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Old Title", "Old Description")

        success = todo_list.update_task(task_id, description="New Description")
        assert success is True
        assert todo_list.tasks[task_id].title == "Old Title"
        assert todo_list.tasks[task_id].description == "New Description"

    def test_update_nonexistent_task_returns_false(self):
        """Test updating a non-existent task returns False."""
        todo_list = TodoList()
        success = todo_list.update_task(999, "New Title")
        assert success is False

    def test_update_task_with_empty_title_raises_error(self):
        """Test that updating a task with empty title raises ValueError."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Test Title")

        with pytest.raises(ValueError, match="Task title cannot be empty"):
            todo_list.update_task(task_id, "")

    def test_delete_task_successfully(self):
        """Test deleting a task successfully."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Test Task")

        success = todo_list.delete_task(task_id)
        assert success is True
        assert task_id not in todo_list.tasks

    def test_delete_nonexistent_task_returns_false(self):
        """Test deleting a non-existent task returns False."""
        todo_list = TodoList()
        success = todo_list.delete_task(999)
        assert success is False

    def test_mark_completed_successfully(self):
        """Test marking a task as completed."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Test Task")

        success = todo_list.mark_completed(task_id, True)
        assert success is True
        assert todo_list.tasks[task_id].completed is True

    def test_mark_incomplete_successfully(self):
        """Test marking a task as incomplete."""
        todo_list = TodoList()
        task_id = todo_list.add_task("Test Task")
        todo_list.mark_completed(task_id, True)  # First mark as complete

        success = todo_list.mark_completed(task_id, False)
        assert success is True
        assert todo_list.tasks[task_id].completed is False

    def test_mark_nonexistent_task_returns_false(self):
        """Test marking a non-existent task returns False."""
        todo_list = TodoList()
        success = todo_list.mark_completed(999, True)
        assert success is False

    def test_get_all_tasks(self):
        """Test getting all tasks."""
        todo_list = TodoList()
        task_id_1 = todo_list.add_task("Task 1")
        task_id_2 = todo_list.add_task("Task 2")

        all_tasks = todo_list.get_all_tasks()
        assert len(all_tasks) == 2
        assert all_tasks[0].id == task_id_1
        assert all_tasks[1].id == task_id_2

    def test_get_pending_tasks(self):
        """Test getting pending tasks."""
        todo_list = TodoList()
        task_id_1 = todo_list.add_task("Pending Task")
        task_id_2 = todo_list.add_task("Completed Task")
        todo_list.mark_completed(task_id_2, True)

        pending_tasks = todo_list.get_pending_tasks()
        assert len(pending_tasks) == 1
        assert pending_tasks[0].id == task_id_1

    def test_get_completed_tasks(self):
        """Test getting completed tasks."""
        todo_list = TodoList()
        task_id_1 = todo_list.add_task("Pending Task")
        task_id_2 = todo_list.add_task("Completed Task")
        todo_list.mark_completed(task_id_2, True)

        completed_tasks = todo_list.get_completed_tasks()
        assert len(completed_tasks) == 1
        assert completed_tasks[0].id == task_id_2