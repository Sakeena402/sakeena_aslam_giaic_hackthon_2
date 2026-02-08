from fastapi import HTTPException, status


class TaskNotFoundException(HTTPException):
    def __init__(self, task_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )


class UserNotAuthorizedException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User not authorized to access this resource"
        )


class DatabaseOperationException(HTTPException):
    def __init__(self, operation: str, details: str = ""):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database operation {operation} failed: {details}"
        )