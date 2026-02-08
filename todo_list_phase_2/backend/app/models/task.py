from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


class TaskBase(SQLModel):
    title: str = Field(max_length=255, nullable=False)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    user_id: int = Field(foreign_key="user.id")


class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow, sa_column_kwargs={"onupdate": datetime.utcnow})