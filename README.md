# Staff Scheduling & Task Management System

A college capstone project for staff scheduling and task management web application.

## Features

- User authentication (login/logout)
- Staff dashboard to view schedules and tasks
- Admin dashboard for managing staff, shifts, and tasks
- Color-coded calendar
- Dark/light theme support
- Multi-user access

## Technology Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js with Express
- **Database**: SQLite

## Project Structure

```
Capstone/
├── config/          # Configuration files
├── middleware/      # Custom middleware (auth, validation, etc.)
├── routes/          # Express route handlers
├── public/          # Static files
│   ├── css/        # Stylesheets
│   └── js/         # Client-side JavaScript
├── views/          # HTML templates
├── server.js       # Main application entry point
├── package.json    # Project dependencies
└── .env           # Environment variables (create this file)
```

## Installed Dependencies

- **express**: Web framework
- **sqlite3**: Database driver
- **dotenv**: Environment variable management
- **express-validator**: Input validation and sanitization
- **bcryptjs**: Password hashing
- **express-session**: Session management

## Setup Instructions

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Create .env file** in the root directory:
   
   A `.env` file has been created for you with default values. For production, you should:
   - Change the `SESSION_SECRET` to a random, secure string
   - Update other values as needed
   
   Reference `.env.example` for the required environment variables.

3. **Run the application**:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## Authentication Setup

The authentication system has been implemented with the following features:

- User login with username and password
- Password hashing using bcryptjs (cost factor: 10)
- Session-based authentication with express-session
- Role-based access control (admin/staff)
- Protected routes with authentication middleware

### Test Users

Two test users have been automatically created:

- **Admin**: username: `admin`, password: `123`
- **Staff**: username: `staff`, password: `123`

### Login Flow

1. Navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Enter credentials (username and password)
4. Upon successful login, you'll be redirected to the appropriate dashboard:
   - Admin users → Admin Dashboard
   - Staff users → Staff Dashboard
5. Use the logout button to end your session

## Next Steps

- Implement staff dashboard features (view schedule, view tasks)
- Implement admin dashboard features (manage staff, assign shifts, manage tasks)
- Add scheduling and calendar functionality
- Implement task management system
- Add dark/light theme support

## Project Requirements

- Staff users can log in, view their schedule and tasks
- Administrators can create accounts, assign shifts, and manage tasks
- Tasks can be marked as completed
- Support multiple concurrent users

## Notes

This is a college capstone project focused on functionality and simplicity.
