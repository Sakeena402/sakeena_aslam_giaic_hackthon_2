"""
Utility functions for the todo application.
Contains helper functions for ID generation, status check, and error handling.
"""

from typing import Union
import sys
import os


def generate_id() -> int:
    """
    Generate a unique ID.
    This is a placeholder function that would be used if we needed a more complex ID generation strategy.
    Currently, the TodoList class handles ID generation internally.
    """
    # This function is not currently used since TodoList manages IDs internally
    # but kept for potential future use
    import time
    return int(time.time() * 1000)  # Millisecond timestamp as unique ID


def is_valid_status(completed: Union[bool, str]) -> bool:
    """
    Check if a status value is valid (boolean or string representation of boolean).

    Args:
        completed: Status value to validate

    Returns:
        bool: True if the status is valid, False otherwise
    """
    if isinstance(completed, bool):
        return True
    if isinstance(completed, str):
        return completed.lower() in ['true', 'false', '1', '0', 'yes', 'no', 'completed', 'pending']
    return False


def format_task_status(completed: bool) -> str:
    """
    Format task completion status for display.

    Args:
        completed (bool): Task completion status

    Returns:
        str: Formatted status string ('Completed' or 'Pending')
    """
    return "Completed" if completed else "Pending"


def display_error(message: str) -> None:
    """
    Display an error message to stderr.

    Args:
        message (str): Error message to display
    """
    print(f"Error: {message}", file=sys.stderr)


def display_success(message: str) -> None:
    """
    Display a success message.

    Args:
        message (str): Success message to display
    """
    print(f"Success: {message}")


def validate_task_title(title: str) -> bool:
    """
    Validate that a task title is not empty.

    Args:
        title (str): Title to validate

    Returns:
        bool: True if title is valid, False otherwise
    """
    return bool(title and title.strip())


def safe_int_input(prompt: str, min_value: int = 1) -> int:
    """
    Safely get an integer input from the user with validation.

    Args:
        prompt (str): Prompt to display to the user
        min_value (int): Minimum allowed value (default: 1)

    Returns:
        int: Validated integer input from the user
    """
    while True:
        try:
            value = int(input(prompt))
            if value < min_value:
                print(f"Please enter a number greater than or equal to {min_value}")
                continue
            return value
        except ValueError:
            print("Please enter a valid number")
        except KeyboardInterrupt:
            print("\nOperation cancelled by user")
            sys.exit(0)


def confirm_action(prompt: str) -> bool:
    """
    Ask the user for confirmation.

    Args:
        prompt (str): Confirmation prompt

    Returns:
        bool: True if user confirms, False otherwise
    """
    response = input(f"{prompt} (y/N): ").lower().strip()
    return response in ['y', 'yes', '1', 'true']