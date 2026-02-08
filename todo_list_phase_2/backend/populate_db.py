"""
Script to populate the database with sample users and tasks
"""

from datetime import datetime
from app.database import Session, engine
from app.models import User, Task
from app.services.task_service import TaskService
from sqlmodel import SQLModel


def create_sample_data():
    """Create sample users and tasks in the database."""

    # Create tables if they don't exist
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        # Create sample users
        print("Creating sample users...")

        # Check if users already exist
        existing_users = session.query(User).all()
        if existing_users:
            print(f"Found {len(existing_users)} existing users. Skipping user creation.")
        else:
            user1 = User(email="alice@example.com")
            user2 = User(email="bob@example.com")

            session.add(user1)
            session.add(user2)
            session.commit()

            # Refresh to get the IDs
            session.refresh(user1)
            session.refresh(user2)

            print(f"Created users: {user1.email} (ID: {user1.id}), {user2.email} (ID: {user2.id})")

        # Get all users to assign tasks to them
        users = session.query(User).all()

        if not users:
            print("No users found in the database!")
            return

        # Create sample tasks for the users
        print("Creating sample tasks...")

        # Get the service to handle task creation
        task_service = TaskService(session)

        # Sample tasks for user 1
        sample_tasks_user1 = [
            {"title": "Complete project proposal", "description": "Finish the project proposal document and submit to manager", "completed": False},
            {"title": "Buy groceries", "description": "Milk, bread, eggs, fruits", "completed": True},
            {"title": "Schedule dentist appointment", "description": "Call Dr. Smith's office to schedule checkup", "completed": False},
            {"title": "Review quarterly reports", "description": "Analyze Q4 financial reports with team", "completed": False}
        ]

        # Sample tasks for user 2
        sample_tasks_user2 = [
            {"title": "Prepare presentation slides", "description": "Create slides for Monday meeting", "completed": False},
            {"title": "Call insurance company", "description": "Renew car insurance policy", "completed": True},
            {"title": "Update resume", "description": "Add new skills and experiences", "completed": False},
            {"title": "Plan weekend trip", "description": "Book hotel and plan itinerary", "completed": False}
        ]

        # Add tasks for user 1
        for task_data in sample_tasks_user1:
            task = Task(
                title=task_data["title"],
                description=task_data["description"],
                completed=task_data["completed"],
                user_id=users[0].id  # Assign to first user
            )
            session.add(task)

        # Add tasks for user 2 (if there's a second user)
        if len(users) > 1:
            for task_data in sample_tasks_user2:
                task = Task(
                    title=task_data["title"],
                    description=task_data["description"],
                    completed=task_data["completed"],
                    user_id=users[1].id  # Assign to second user
                )
                session.add(task)

        session.commit()

        # Count and display created tasks
        total_tasks = session.query(Task).count()
        user1_tasks = session.query(Task).filter(Task.user_id == users[0].id).count()
        user2_tasks = session.query(Task).filter(Task.user_id == users[1].id).count() if len(users) > 1 else 0

        print(f"\n[STATS] Database populated successfully!")
        print(f"   Users created: {len(users)}")
        print(f"   Total tasks created: {total_tasks}")
        print(f"   Tasks for {users[0].email}: {user1_tasks}")
        if len(users) > 1:
            print(f"   Tasks for {users[1].email}: {user2_tasks}")

        # Show all tasks
        print(f"\n[TASKS] All Tasks in Database:")
        all_tasks = session.query(Task).all()
        for task in all_tasks:
            user_email = next((u.email for u in users if u.id == task.user_id), "Unknown")
            status = "[DONE]" if task.completed else "[TODO]"
            print(f"   {status} [User: {user_email}] {task.title}")


if __name__ == "__main__":
    print("[START] Starting database population...")
    create_sample_data()
    print("\n[DONE] Database population completed!")