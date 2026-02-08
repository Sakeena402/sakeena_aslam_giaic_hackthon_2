"""
Todo application core functionality.
Contains Task and TodoList classes for managing todo items.
"""

from typing import List, Optional, Dict
import uuid
from datetime import datetime


class Task:
    """
    Represents a single todo task.

    Attributes:
        id (int): Unique identifier for the task, auto-incremented
        title (str): Required title of the task (non-empty string)
        description (str): Optional description of the task (nullable string)
        completed (bool): Boolean indicating completion status (default: False)
    """

    def __init__(self, task_id: int, title: str, description: Optional[str] = None, completed: bool = False):
        """
        Initialize a new Task.

        Args:
            task_id (int): Unique identifier for the task
            title (str): Title of the task (must be non-empty)
            description (str, optional): Description of the task
            completed (bool): Completion status (default: False)

        Raises:
            ValueError: If title is empty
        """
        if not title or not title.strip():
            raise ValueError("Task title cannot be empty")

        self.id = task_id
        self.title = title.strip()
        self.description = description
        self.completed = completed
        self.created_at = datetime.now()

    def __repr__(self):
        """String representation of the Task."""
        return f"Task(id={self.id}, title='{self.title}', completed={self.completed})"

    def __str__(self):
        """Human-readable string representation of the Task."""
        status = "✓" if self.completed else "○"
        desc = f" - {self.description}" if self.description else ""
        return f"[{status}] {self.id}. {self.title}{desc}"


class TodoList:
    """
    Manages a collection of tasks in memory.

    Attributes:
        tasks (dict): Dictionary mapping task IDs to Task objects
        next_id (int): Counter for assigning next available ID (starts at 1)
    """

    def __init__(self):
        """Initialize an empty TodoList."""
        self.tasks: Dict[int, Task] = {}
        self.next_id = 1

    def add_task(self, title: str, description: Optional[str] = None) -> int:
        """
        Add a new task to the list.

        Args:
            title (str): Title of the task (must be non-empty)
            description (str, optional): Description of the task

        Returns:
            int: The ID of the newly created task

        Raises:
            ValueError: If title is empty
        """
        if not title or not title.strip():
            raise ValueError("Task title cannot be empty")

        task_id = self.next_id
        task = Task(task_id=task_id, title=title, description=description)
        self.tasks[task_id] = task
        self.next_id += 1
        return task_id

    def get_task(self, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID.

        Args:
            task_id (int): ID of the task to retrieve

        Returns:
            Task or None: The task if found, None otherwise
        """
        return self.tasks.get(task_id)

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> bool:
        """
        Update an existing task's title or description.

        Args:
            task_id (int): ID of the task to update
            title (str, optional): New title for the task
            description (str, optional): New description for the task

        Returns:
            bool: True if task was updated, False if task doesn't exist
        """
        if task_id not in self.tasks:
            return False

        task = self.tasks[task_id]

        if title is not None:
            if not title or not title.strip():
                raise ValueError("Task title cannot be empty")
            task.title = title.strip()

        if description is not None:
            task.description = description

        return True

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id (int): ID of the task to delete

        Returns:
            bool: True if task was deleted, False if task doesn't exist
        """
        if task_id not in self.tasks:
            return False

        del self.tasks[task_id]
        return True

    def mark_completed(self, task_id: int, completed: bool = True) -> bool:
        """
        Mark a task as completed or incomplete.

        Args:
            task_id (int): ID of the task to update
            completed (bool): Whether the task is completed (default: True)

        Returns:
            bool: True if task was updated, False if task doesn't exist
        """
        if task_id not in self.tasks:
            return False

        self.tasks[task_id].completed = completed
        return True

    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks in the list.

        Returns:
            List[Task]: List of all tasks, sorted by ID
        """
        return sorted(self.tasks.values(), key=lambda x: x.id)

    def get_pending_tasks(self) -> List[Task]:
        """
        Get all pending (not completed) tasks.

        Returns:
            List[Task]: List of pending tasks, sorted by ID
        """
        return sorted([task for task in self.tasks.values() if not task.completed], key=lambda x: x.id)

    def get_completed_tasks(self) -> List[Task]:
        """
        Get all completed tasks.

        Returns:
            List[Task]: List of completed tasks, sorted by ID
        """
        return sorted([task for task in self.tasks.values() if task.completed], key=lambda x: x.id)