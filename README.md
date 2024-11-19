# Task Management API

## Overview

A robust Node.js RESTful API for task management with user authentication.

## Features

- User registration and authentication
- CRUD operations for tasks
- JWT-based authorization
- Input validation
- In-memory data storage


## Installation

```bash
# Clone repository
git clone https://github.com/Knight321r/task-management-api.git
cd task-management-api

# Install dependencies
npm install
```

## Running the Application

```bash
# Start server
npm start
```

## API Endpoints

### Authentication

- `POST /auth/register`: Register new user
- `POST /auth/login`: Authenticate user

### Tasks

- `GET /tasks`: Retrieve all tasks
- `GET /tasks/:id`: Get specific task
- `POST /tasks`: Create new task
- `PUT /tasks/:id`: Update task
- `DELETE /tasks/:id`: Delete task
- `PATCH /tasks/:id/complete`: Mark task as complete

## Testing

- Uses Mocha, Chai for unit testing
- Covers critical authentication and task management functions
- Mocks dependencies for isolated testing

## Design Decisions

- JWT for stateless authentication
- Bcrypt for password hashing
- Joi for input validation
- In-memory storage for simplicity

## Future Improvements

- Enhanced error handling
- Rate limiting
