from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List
from ..database import get_session
from ..models import Task
from ..schemas import Task as TaskSchema, TaskCreate, TaskUpdate
from ..services import TaskService
from ..middleware.jwt_middleware import JWTBearer

router = APIRouter(
    prefix="/api/{user_id}/tasks",
    tags=["tasks"],
    dependencies=[Depends(JWTBearer())]
)


@router.post("/", response_model=TaskSchema, status_code=status.HTTP_201_CREATED)
def create_task(
    user_id: int,
    task_data: TaskCreate,
    session: Session = Depends(get_session)
):
    """Create a new task for the specified user."""
    # Ensure the user_id in the path matches the one in the token
    # (This would typically be validated by checking the JWT token)

    # For now, we'll trust the user_id in the path, but in a real implementation
    # we'd verify this against the JWT token
    task_service = TaskService(session)

    # Override user_id to ensure the task belongs to the correct user
    task_data.user_id = user_id

    try:
        task = task_service.create_task(task_data)
        return task
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating task: {str(e)}"
        )


@router.get("/", response_model=List[TaskSchema])
def get_tasks(
    user_id: int,
    session: Session = Depends(get_session)
):
    """Get all tasks for the specified user."""
    task_service = TaskService(session)
    tasks = task_service.get_tasks_by_user(user_id)
    return tasks


@router.get("/{task_id}", response_model=TaskSchema)
def get_task(
    user_id: int,
    task_id: int,
    session: Session = Depends(get_session)
):
    """Get a specific task by ID for the specified user."""
    task_service = TaskService(session)
    task = task_service.get_task_by_id(task_id, user_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.put("/{task_id}", response_model=TaskSchema)
def update_task(
    user_id: int,
    task_id: int,
    task_update: TaskUpdate,
    session: Session = Depends(get_session)
):
    """Update a specific task for the specified user."""
    task_service = TaskService(session)
    updated_task = task_service.update_task(task_id, user_id, task_update)

    if not updated_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return updated_task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    user_id: int,
    task_id: int,
    session: Session = Depends(get_session)
):
    """Delete a specific task for the specified user."""
    task_service = TaskService(session)
    success = task_service.delete_task(task_id, user_id)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return


@router.patch("/{task_id}/complete", response_model=TaskSchema)
def update_task_completion(
    user_id: int,
    task_id: int,
    completed: bool,
    session: Session = Depends(get_session)
):
    """Update the completion status of a specific task for the specified user."""
    task_service = TaskService(session)
    updated_task = task_service.update_task_completion_status(task_id, user_id, completed)

    if not updated_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return updated_task