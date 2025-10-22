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

2. **Create .env file** in the root directory with the following content:
   ```
   PORT=3000
   NODE_ENV=development
   SESSION_SECRET=your-secret-key-here
   DB_PATH=./database.db
   ```

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

## Next Steps

- Create database schema and initialization script
- Set up authentication routes and middleware
- Build HTML views for login, staff dashboard, and admin dashboard
- Implement scheduling and task management features
- Add styling and theme support

## Project Requirements

- Staff users can log in, view their schedule and tasks
- Administrators can create accounts, assign shifts, and manage tasks
- Tasks can be marked as completed
- Support multiple concurrent users

## Notes

This is a college capstone project focused on functionality and simplicity.
