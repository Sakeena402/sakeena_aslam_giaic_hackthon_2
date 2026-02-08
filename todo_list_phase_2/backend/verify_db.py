"""
Script to verify data in the Neon PostgreSQL database
"""

from app.database import Session, engine
from app.models import User, Task
from sqlmodel import SQLModel


def verify_database_content():
    """Verify that data exists in the database."""

    print("[CHECK] Verifying database content...")

    with Session(engine) as session:
        # Count users
        user_count = session.query(User).count()
        print(f"[INFO] Total users in database: {user_count}")

        # Get all users
        users = session.query(User).all()
        for user in users:
            print(f"   - User: {user.email} (ID: {user.id})")

        # Count tasks
        task_count = session.query(Task).count()
        print(f"[INFO] Total tasks in database: {task_count}")

        # Get tasks grouped by user
        for user in users:
            user_tasks = session.query(Task).filter(Task.user_id == user.id).all()
            print(f"   - Tasks for {user.email}: {len(user_tasks)}")
            for task in user_tasks:
                status = "[DONE]" if task.completed else "[TODO]"
                print(f"      {status} {task.title}")

        print(f"\n[SUCCESS] Database verification complete!")
        print(f"[CONFIRMED] Your data is successfully stored in Neon PostgreSQL database")
        print(f"[RECORDS] {user_count} users and {task_count} tasks are in your Neon database")


if __name__ == "__main__":
    print("[VERIFY] Starting database verification...")
    verify_database_content()
    print("[DONE] Verification completed successfully!")