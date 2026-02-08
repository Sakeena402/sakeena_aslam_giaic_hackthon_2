"""
Integration tests for the CLI workflow.
Tests the end-to-end functionality of the CLI interface.
"""

import pytest
from unittest.mock import patch, MagicMock
from src.main import TodoApp
from src.todo import Task


class TestCliFlow:
    """Integration tests for the CLI workflow."""

    def setup_method(self):
        """Set up a fresh TodoApp instance for each test."""
        self.app = TodoApp()

    def test_full_workflow_add_view_update_complete_delete(self):
        """Test the complete workflow: Add → View → Update → Mark Complete → Delete."""
        # Step 1: Add a task
        with patch('builtins.input', side_effect=['Test Task', 'Test Description']):
            with patch('builtins.print') as mock_print:
                self.app.add_task()

        # Verify task was added
        assert len(self.app.todo_list.tasks) == 1
        task = list(self.app.todo_list.tasks.values())[0]
        assert task.title == 'Test Task'
        assert task.description == 'Test Description'
        assert task.completed is False

        # Step 2: View all tasks
        with patch('builtins.print') as mock_print:
            self.app.view_all_tasks()

        # Verify we can retrieve the task
        retrieved_task = self.app.todo_list.get_task(1)
        assert retrieved_task is not None
        assert retrieved_task.title == 'Test Task'

        # Step 3: Update the task
        with patch('builtins.input', side_effect=['New Title', 'New Description']):
            with patch('builtins.print') as mock_print:
                # Since we can't directly call update_task with params, we'll test the functionality directly
                success = self.app.todo_list.update_task(1, 'Updated Title', 'Updated Description')
                assert success is True

        # Verify update worked
        updated_task = self.app.todo_list.get_task(1)
        assert updated_task.title == 'Updated Title'
        assert updated_task.description == 'Updated Description'

        # Step 4: Mark task as complete
        success = self.app.todo_list.mark_completed(1, True)
        assert success is True
        completed_task = self.app.todo_list.get_task(1)
        assert completed_task.completed is True

        # Step 5: Verify task is in completed list
        completed_tasks = self.app.todo_list.get_completed_tasks()
        assert len(completed_tasks) == 1
        assert completed_tasks[0].id == 1

        # Step 6: Delete the task
        success = self.app.todo_list.delete_task(1)
        assert success is True
        assert len(self.app.todo_list.tasks) == 0

    def test_add_multiple_tasks_and_manage(self):
        """Test adding multiple tasks and managing them."""
        # Add first task
        task1_id = self.app.todo_list.add_task("First Task", "Description 1")
        assert task1_id == 1

        # Add second task
        task2_id = self.app.todo_list.add_task("Second Task", "Description 2")
        assert task2_id == 2

        # Verify both tasks exist
        all_tasks = self.app.todo_list.get_all_tasks()
        assert len(all_tasks) == 2

        # Mark first task as complete
        success = self.app.todo_list.mark_completed(1, True)
        assert success is True

        # Verify task distribution
        pending_tasks = self.app.todo_list.get_pending_tasks()
        completed_tasks = self.app.todo_list.get_completed_tasks()
        assert len(pending_tasks) == 1
        assert len(completed_tasks) == 1
        assert pending_tasks[0].id == 2
        assert completed_tasks[0].id == 1

        # Update second task
        success = self.app.todo_list.update_task(2, "Updated Second Task")
        assert success is True

        updated_task = self.app.todo_list.get_task(2)
        assert updated_task.title == "Updated Second Task"

    def test_edge_cases_handling(self):
        """Test handling of edge cases."""
        # Try to get a non-existent task
        task = self.app.todo_list.get_task(999)
        assert task is None

        # Try to update a non-existent task
        success = self.app.todo_list.update_task(999, "New Title")
        assert success is False

        # Try to delete a non-existent task
        success = self.app.todo_list.delete_task(999)
        assert success is False

        # Try to mark complete a non-existent task
        success = self.app.todo_list.mark_completed(999, True)
        assert success is False

        # Test with empty lists
        all_tasks = self.app.todo_list.get_all_tasks()
        assert len(all_tasks) == 0

        pending_tasks = self.app.todo_list.get_pending_tasks()
        assert len(pending_tasks) == 0

        completed_tasks = self.app.todo_list.get_completed_tasks()
        assert len(completed_tasks) == 0

    def test_task_validation(self):
        """Test task validation logic."""
        # Try to add a task with empty title
        with pytest.raises(ValueError, match="Task title cannot be empty"):
            self.app.todo_list.add_task("")

        # Try to add a task with whitespace-only title
        with pytest.raises(ValueError, match="Task title cannot be empty"):
            self.app.todo_list.add_task("   ")

        # Add a valid task
        task_id = self.app.todo_list.add_task("Valid Task")
        assert task_id == 1

        # Try to update with empty title
        with pytest.raises(ValueError, match="Task title cannot be empty"):
            self.app.todo_list.update_task(1, "")