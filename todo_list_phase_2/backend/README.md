# Todo App Backend

A FastAPI-based backend service for a multi-user todo application with JWT authentication and PostgreSQL database.

## Features

- JWT-based authentication and authorization
- Multi-user support with data isolation
- Full CRUD operations for todo tasks
- Task completion status management
- Secure API endpoints with role-based access control

## API Endpoints

### Task Management

- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Update task completion status

## Installation

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables (copy `.env.example` to `.env` and update values)

## Running the Application

```bash
uvicorn app.main:app --reload --port 8000
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL database connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_ALGORITHM`: Algorithm for JWT token signing (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time in minutes (default: 30)

## Database Migrations

This project uses Alembic for database migrations:

```bash
# Create a new migration
alembic revision --autogenerate -m "Migration message"

# Apply migrations
alembic upgrade head
```

## Testing

Run the test suite:

```bash
pytest
```

## Technologies Used

- FastAPI: Modern, fast web framework for building APIs with Python
- SQLModel: SQL databases in Python, with full type support
- Pydantic: Data validation and settings management
- JWT: JSON Web Token for authentication
- PostgreSQL: Object-relational database system