#!/usr/bin/env python3
"""
Main CLI entry point for the Todo application.
Provides a command-line interface for managing todo tasks.
"""

import sys
import os
from typing import Optional

# Add the src directory to the path to import modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from todo import TodoList, Task
from utils import display_error, display_success, safe_int_input, confirm_action


class TodoApp:
    """
    Main application class that manages the CLI interface for the todo app.
    """

    def __init__(self):
        """Initialize the Todo application."""
        self.todo_list = TodoList()

    def display_menu(self):
        """Display the main menu options."""
        print("\n" + "="*50)
        print("CLI Todo App")
        print("="*50)
        print("1. Add Task")
        print("2. View All Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("5. Mark Task Complete")
        print("6. Mark Task Incomplete")
        print("7. View Pending Tasks")
        print("8. View Completed Tasks")
        print("9. Exit")
        print("="*50)

    def add_task(self):
        """Add a new task to the list."""
        try:
            title = input("Enter task title: ").strip()
            if not title:
                display_error("Task title cannot be empty")
                return

            description_input = input("Enter task description (optional, press Enter to skip): ").strip()
            description = description_input if description_input else None

            task_id = self.todo_list.add_task(title, description)
            display_success(f"Task added with ID {task_id}")
        except ValueError as e:
            display_error(str(e))
        except KeyboardInterrupt:
            print("\nOperation cancelled by user")

    def view_all_tasks(self):
        """View all tasks in the list."""
        tasks = self.todo_list.get_all_tasks()
        if not tasks:
            print("No tasks in the list.")
            return

        print("\nAll Tasks:")
        print("-" * 60)
        for task in tasks:
            status = "✓" if task.completed else "○"
            desc = f"\n   Description: {task.description}" if task.description else ""
            print(f"[{status}] {task.id}. {task.title}{desc}")
        print("-" * 60)

    def view_pending_tasks(self):
        """View pending tasks only."""
        tasks = self.todo_list.get_pending_tasks()
        if not tasks:
            print("No pending tasks.")
            return

        print("\nPending Tasks:")
        print("-" * 60)
        for task in tasks:
            desc = f"\n   Description: {task.description}" if task.description else ""
            print(f"○ {task.id}. {task.title}{desc}")
        print("-" * 60)

    def view_completed_tasks(self):
        """View completed tasks only."""
        tasks = self.todo_list.get_completed_tasks()
        if not tasks:
            print("No completed tasks.")
            return

        print("\nCompleted Tasks:")
        print("-" * 60)
        for task in tasks:
            desc = f"\n   Description: {task.description}" if task.description else ""
            print(f"✓ {task.id}. {task.title}{desc}")
        print("-" * 60)

    def update_task(self):
        """Update an existing task."""
        if not self.todo_list.tasks:
            display_error("No tasks available to update")
            return

        self.view_all_tasks()
        try:
            task_id = safe_int_input("Enter task ID to update: ", 1)

            if task_id not in self.todo_list.tasks:
                display_error(f"Task with ID {task_id} does not exist")
                return

            task = self.todo_list.tasks[task_id]
            print(f"Current task: {task.title}")

            new_title = input(f"Enter new title (current: '{task.title}', press Enter to keep current): ").strip()
            if not new_title:
                new_title = task.title
            elif not new_title.strip():
                display_error("Task title cannot be empty")
                return

            new_description = input(f"Enter new description (current: '{task.description or 'None'}', press Enter to keep current): ").strip()
            if new_description == "":
                new_description = task.description

            success = self.todo_list.update_task(task_id, new_title, new_description)
            if success:
                display_success(f"Task {task_id} updated successfully")
            else:
                display_error(f"Failed to update task {task_id}")
        except ValueError as e:
            display_error(str(e))
        except KeyboardInterrupt:
            print("\nOperation cancelled by user")

    def delete_task(self):
        """Delete a task."""
        if not self.todo_list.tasks:
            display_error("No tasks available to delete")
            return

        self.view_all_tasks()
        try:
            task_id = safe_int_input("Enter task ID to delete: ", 1)

            if task_id not in self.todo_list.tasks:
                display_error(f"Task with ID {task_id} does not exist")
                return

            task = self.todo_list.tasks[task_id]
            if confirm_action(f"Are you sure you want to delete task '{task.title}'?"):
                success = self.todo_list.delete_task(task_id)
                if success:
                    display_success(f"Task {task_id} deleted successfully")
                else:
                    display_error(f"Failed to delete task {task_id}")
        except KeyboardInterrupt:
            print("\nOperation cancelled by user")

    def mark_task_complete(self):
        """Mark a task as complete."""
        pending_tasks = self.todo_list.get_pending_tasks()
        if not pending_tasks:
            print("No pending tasks to mark as complete.")
            return

        print("\nPending Tasks:")
        for task in pending_tasks:
            print(f"{task.id}. {task.title}")

        try:
            task_id = safe_int_input("Enter task ID to mark as complete: ", 1)

            if task_id not in self.todo_list.tasks:
                display_error(f"Task with ID {task_id} does not exist")
                return

            success = self.todo_list.mark_completed(task_id, True)
            if success:
                display_success(f"Task {task_id} marked as complete")
            else:
                display_error(f"Failed to mark task {task_id} as complete")
        except KeyboardInterrupt:
            print("\nOperation cancelled by user")

    def mark_task_incomplete(self):
        """Mark a task as incomplete."""
        completed_tasks = self.todo_list.get_completed_tasks()
        if not completed_tasks:
            print("No completed tasks to mark as incomplete.")
            return

        print("\nCompleted Tasks:")
        for task in completed_tasks:
            print(f"{task.id}. {task.title}")

        try:
            task_id = safe_int_input("Enter task ID to mark as incomplete: ", 1)

            if task_id not in self.todo_list.tasks:
                display_error(f"Task with ID {task_id} does not exist")
                return

            success = self.todo_list.mark_completed(task_id, False)
            if success:
                display_success(f"Task {task_id} marked as incomplete")
            else:
                display_error(f"Failed to mark task {task_id} as incomplete")
        except KeyboardInterrupt:
            print("\nOperation cancelled by user")

    def run(self):
        """Run the main application loop."""
        print("Welcome to CLI Todo App!")
        while True:
            self.display_menu()
            try:
                choice = input("Enter your choice (1-9): ").strip()

                if choice == '1':
                    self.add_task()
                elif choice == '2':
                    self.view_all_tasks()
                elif choice == '3':
                    self.update_task()
                elif choice == '4':
                    self.delete_task()
                elif choice == '5':
                    self.mark_task_complete()
                elif choice == '6':
                    self.mark_task_incomplete()
                elif choice == '7':
                    self.view_pending_tasks()
                elif choice == '8':
                    self.view_completed_tasks()
                elif choice == '9':
                    print("Thank you for using CLI Todo App. Goodbye!")
                    sys.exit(0)
                else:
                    display_error("Invalid choice. Please enter a number between 1 and 9.")
            except KeyboardInterrupt:
                print("\n\nThank you for using CLI Todo App. Goodbye!")
                sys.exit(0)
            except EOFError:
                print("\n\nThank you for using CLI Todo App. Goodbye!")
                sys.exit(0)


def main():
    """Main entry point for the application."""
    app = TodoApp()
    app.run()


if __name__ == "__main__":
    main()