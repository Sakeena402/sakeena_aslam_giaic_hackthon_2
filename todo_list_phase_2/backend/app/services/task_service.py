from sqlmodel import Session, select, and_
from typing import List, Optional
from ..models import Task
from ..schemas import TaskCreate, TaskUpdate


class TaskService:
    def __init__(self, session: Session):
        self.session = session

    def create_task(self, task_data: TaskCreate) -> Task:
        """Create a new task for a user."""
        db_task = Task.from_orm(task_data) if hasattr(Task, 'from_orm') else Task(**task_data.model_dump())
        self.session.add(db_task)
        self.session.commit()
        self.session.refresh(db_task)
        return db_task

    def get_tasks_by_user(self, user_id: int) -> List[Task]:
        """Get all tasks for a specific user."""
        statement = select(Task).where(Task.user_id == user_id)
        results = self.session.exec(statement)
        return results.all()

    def get_task_by_id(self, task_id: int, user_id: int) -> Optional[Task]:
        """Get a specific task by ID for a specific user."""
        statement = select(Task).where(and_(Task.id == task_id, Task.user_id == user_id))
        result = self.session.exec(statement)
        return result.first()

    def update_task(self, task_id: int, user_id: int, task_update: TaskUpdate) -> Optional[Task]:
        """Update a task for a specific user."""
        statement = select(Task).where(and_(Task.id == task_id, Task.user_id == user_id))
        result = self.session.exec(statement)
        db_task = result.first()

        if not db_task:
            return None

        # Update the task with provided fields
        update_data = task_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_task, field, value)

        self.session.add(db_task)
        self.session.commit()
        self.session.refresh(db_task)
        return db_task

    def update_task_completion_status(self, task_id: int, user_id: int, completed: bool) -> Optional[Task]:
        """Update the completion status of a task."""
        statement = select(Task).where(and_(Task.id == task_id, Task.user_id == user_id))
        result = self.session.exec(statement)
        db_task = result.first()

        if not db_task:
            return None

        db_task.completed = completed
        self.session.add(db_task)
        self.session.commit()
        self.session.refresh(db_task)
        return db_task

    def delete_task(self, task_id: int, user_id: int) -> bool:
        """Delete a task for a specific user."""
        statement = select(Task).where(and_(Task.id == task_id, Task.user_id == user_id))
        result = self.session.exec(statement)
        db_task = result.first()

        if not db_task:
            return False

        self.session.delete(db_task)
        self.session.commit()
        return True