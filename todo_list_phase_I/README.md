# CLI Todo App

A simple command-line interface todo application with in-memory storage, supporting the five core operations: Add, View, Update, Delete, and Mark Complete.

## Features

- Add tasks with title and optional description
- View all tasks with their status (completed/pending)
- Update task title and description
- Delete tasks
- Mark tasks as complete/incomplete
- In-memory storage (no persistence)
- User-friendly CLI interface

## Prerequisites

- Python 3.13 or higher

## Installation

1. Clone or download the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Run the application:
```bash
python src/main.py
```

The application provides a menu-driven interface with the following options:
1. Add Task
2. View All Tasks
3. Update Task
4. Delete Task
5. Mark Task Complete
6. Mark Task Incomplete
7. View Pending Tasks
8. View Completed Tasks
9. Exit

## Project Structure

```
src/
├── main.py              # Main CLI entry point
├── todo.py              # Task class and operations
└── utils.py             # Helper functions

tests/
├── unit/
│   ├── test_todo.py     # Unit tests for todo operations
│   └── test_utils.py    # Unit tests for utility functions
└── integration/
    └── test_cli_flow.py # Integration tests for CLI workflow
```

## Running Tests

To run all tests:
```bash
python -m pytest tests/
```

To run unit tests only:
```bash
python -m pytest tests/unit/
```

## Development

This project follows the spec-driven development approach using Claude Code and Spec-Kit Plus. The implementation is based on the specification in the `specs/001-cli-todo-app/` directory.

## License

[Specify your license here]