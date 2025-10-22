# Task Management Feature Documentation

## Overview
Simple task management system for admin dashboard allowing admins to create, delete, and assign tasks to users.

## Features Implemented

### 1. Database Schema
**Tasks Table:**
- `id` - Primary key
- `title` - Task title (required)
- `description` - Task description (optional)
- `assigned_to` - Foreign key to users table
- `status` - Task status (default: 'pending')
- `created_at` - Timestamp

### 2. Backend API Routes
**Base URL:** `/api`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users for assignment dropdown | Admin only |
| GET | `/tasks` | Get all tasks with user info | Admin only |
| GET | `/my-tasks` | Get tasks for logged-in user | Any authenticated user |
| POST | `/tasks` | Create a new task | Admin only |
| DELETE | `/tasks/:id` | Delete a task by ID | Admin only |
| PATCH | `/tasks/:id/complete` | Mark a task as completed | Any authenticated user |

### 3. Admin Dashboard UI
**New Section: Task Management**
- "Add New Task" button
- Task creation form with:
  - Title field (required)
  - Description textarea (optional)
  - User assignment dropdown (populated from database)
  - Create and Cancel buttons
- Tasks list display showing:
  - Task title and description
  - **Task status** (pending/completed) with color coding
  - Assigned user
  - Creation date/time
  - Delete button
- Visual indicators:
  - Completed tasks have green background and strikethrough title
  - Status badges: pending (yellow), completed (green)

### 4. Staff Dashboard UI
**New Section: My Assigned Tasks**
- Displays all tasks assigned to the logged-in staff user
- Shows for each task:
  - Task title and description
  - Task status (pending/completed) with color coding
  - Assignment date/time
  - "Mark as Complete" button (only for pending tasks)
- Visual indicators:
  - Completed tasks have green background and strikethrough title
  - Status badges: pending (yellow), completed (green)
- Empty state message if no tasks assigned

### 5. Client-Side Functionality

**Admin:** `public/js/admin-tasks.js`
- Load all users on page load
- Populate user dropdown for task assignment
- Load and display all tasks
- Create new task via form submission
- Delete task with confirmation
- Real-time UI updates after operations
- Error handling and user feedback

**Staff:** `public/js/staff-tasks.js`
- Load tasks assigned to logged-in user
- Display tasks with status indicators
- Mark tasks as completed
- Show "Mark as Complete" button only for pending tasks
- Visual feedback for completed tasks (strikethrough, green background)
- Error handling and empty state display

### 6. Styling
Simple, clean styling for:
- Task form (admin)
- Task list items (admin and staff)
- Staff task items with subtle gradient background
- Responsive design for mobile
- Hover effects
- Action buttons

## How to Use

### For Staff Users:

1. **Log in** with staff credentials (username: `staff`, password: `123`)

2. **View Assigned Tasks:**
   - All tasks assigned to you are displayed in the "My Assigned Tasks" section
   - Shows task title, description, status, and assignment date
   - Tasks are listed in reverse chronological order (newest first)
   - If no tasks are assigned, a message will indicate this

3. **Mark Task as Completed:**
   - Click the "Mark as Complete" button on any pending task
   - Confirm the action
   - Task status changes to "completed"
   - Completed tasks appear with a green background and strikethrough title
   - The "Mark as Complete" button disappears for completed tasks

### For Admins:

1. **Log in** with admin credentials (username: `admin`, password: `123`)

2. **View Tasks:**
   - All tasks are displayed in the Task Management section
   - Shows task title, description, **status** (pending/completed), assigned user, and creation date
   - Completed tasks appear with a green background and strikethrough title
   - Status is color-coded: pending (yellow), completed (green)

3. **Create a Task:**
   - Click "Add New Task" button
   - Fill in the task title (required)
   - Optionally add a description
   - Select a user to assign the task to (or leave unassigned)
   - Click "Create Task"
   - The form will close and the new task appears in the list

4. **Delete a Task:**
   - Click the "Delete" button on any task
   - Confirm the deletion
   - Task is removed from the list

## File Structure

```
Capstone/
├── config/
│   └── database.js          # Added tasks table and CRUD functions
├── routes/
│   └── taskRoutes.js        # NEW - Task API routes
├── views/
│   ├── admin-dashboard.html # Updated with task management UI
│   └── staff-dashboard.html # Updated to show assigned tasks
├── public/
│   ├── css/
│   │   └── style.css        # Added task management styles
│   └── js/
│       ├── admin-tasks.js   # NEW - Task management JavaScript (admin)
│       └── staff-tasks.js   # NEW - Task viewing JavaScript (staff)
└── server.js                # Updated to include task routes
```

## API Examples

### Get All Users
```javascript
GET /api/users
Response: { success: true, users: [...] }
```

### Get All Tasks
```javascript
GET /api/tasks
Response: { success: true, tasks: [...] }
```

### Get My Tasks (Staff)
```javascript
GET /api/my-tasks
Response: { success: true, tasks: [...] }
```

### Create Task
```javascript
POST /api/tasks
Body: {
  title: "Fix bug in login",
  description: "Users can't log in with special characters",
  assignedTo: 2
}
Response: { success: true, taskId: 1 }
```

### Delete Task
```javascript
DELETE /api/tasks/1
Response: { success: true, message: "Task deleted successfully" }
```

### Mark Task as Completed
```javascript
PATCH /api/tasks/1/complete
Response: { success: true, message: "Task marked as completed" }
```

## Security
- All task routes require authentication
- Only admin users can access task management
- Input validation on task creation
- SQL injection prevention with parameterized queries
- XSS protection with HTML escaping in UI

## Database Functions Added

**In `config/database.js`:**
- `getAllUsers()` - Returns all users (id, username, role)
- `getAllTasks()` - Returns all tasks with joined user information
- `getTasksByUserId(userId)` - Returns tasks for a specific user
- `createTask(title, description, assignedTo)` - Creates new task
- `deleteTask(id)` - Deletes task by ID
- `updateTaskStatus(id, status)` - Updates task status (e.g., to 'completed')

## Notes
- Simple implementation as requested (no over-engineering)
- Tasks are displayed in reverse chronological order
- Unassigned tasks show "Unassigned" instead of username
- Delete confirmation prevents accidental deletions
- All operations provide user feedback
- Mobile-responsive design included

