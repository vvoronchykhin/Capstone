# Authentication System Documentation

## Overview

The authentication system has been successfully implemented with secure password hashing, session management, and role-based access control.

## Features Implemented

### 1. Database Setup
- **File**: `config/database.js`
- SQLite database with users table
- Automatic initialization on server start
- Test users created automatically:
  - Admin: username `admin`, password `123` (hashed)
  - Staff: username `staff`, password `123` (hashed)
- Password hashing using bcryptjs with cost factor 10
- Exports only necessary functions: `initializeDatabase`, `getUserByUsername`

### 2. Authentication Middleware
- **File**: `middleware/authMiddleware.js`
- `isAuthenticated()` - Verifies user has an active session
- `isAdmin()` - Verifies user has admin role
- `isStaff()` - Verifies user has staff role

### 3. Routes
- **File**: `routes/authRoutes.js`
- `GET /` - Redirects to login or appropriate dashboard
- `GET /login` - Serves login page
- `POST /login` - Authenticates user and creates session
- `POST /logout` - Destroys session and logs out user
- `GET /staff-dashboard` - Protected staff dashboard
- `GET /admin-dashboard` - Protected admin dashboard

### 4. Server Configuration
- **File**: `server.js`
- Express server with session middleware
- HTTP-only cookies for security
- Static file serving for CSS/JS
- Error handling middleware
- Database initialization on startup

### 5. Views
- **Login Page** (`views/login.html`): Clean login form with error display
- **Staff Dashboard** (`views/staff-dashboard.html`): Stub with navigation and logout
- **Admin Dashboard** (`views/admin-dashboard.html`): Stub with navigation and logout

### 6. Client-Side JavaScript
- **Login** (`public/js/login.js`): Form handling, AJAX requests, error display
- **Dashboard** (`public/js/dashboard.js`): Logout functionality

### 7. Styling
- **File**: `public/css/style.css`
- Responsive design with mobile-first approach
- Professional color scheme
- Clean card-based layouts
- Accessible focus states

## Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs with cost factor 10
2. **Session Management**: Express-session with HTTP-only cookies
3. **Protected Routes**: Middleware prevents unauthorized access
4. **Input Validation**: Express-validator on login endpoint
5. **SQL Injection Prevention**: Parameterized queries throughout
6. **Error Messages**: Generic error messages to prevent user enumeration

## Testing the Application

### Starting the Server
```bash
npm start
```

Server runs on: http://localhost:3000

### Test Credentials

**Admin User:**
- Username: `admin`
- Password: `123`
- Access: Admin Dashboard

**Staff User:**
- Username: `staff`
- Password: `123`
- Access: Staff Dashboard

### Login Flow

1. Navigate to http://localhost:3000
2. You'll be redirected to the login page
3. Enter username and password
4. Upon successful login:
   - Admin users are redirected to `/admin-dashboard`
   - Staff users are redirected to `/staff-dashboard`
5. Invalid credentials show: "Invalid username or password"
6. Click "Logout" button to end session

### Protected Routes

- Attempting to access dashboards without authentication redirects to login
- Staff cannot access admin dashboard (403 error)
- Admin cannot access staff dashboard (403 error)
- Each user only sees their appropriate dashboard

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,  -- bcrypt hashed
  role TEXT NOT NULL CHECK(role IN ('admin', 'staff')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Environment Variables

Required in `.env` file:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `SESSION_SECRET` - Secret key for session encryption
- `DB_PATH` - Path to SQLite database file

## File Structure

```
Capstone/
├── config/
│   └── database.js           # Database configuration and helpers
├── middleware/
│   └── authMiddleware.js     # Authentication middleware
├── routes/
│   └── authRoutes.js         # Authentication routes
├── views/
│   ├── login.html            # Login page
│   ├── staff-dashboard.html  # Staff dashboard stub
│   └── admin-dashboard.html  # Admin dashboard stub
├── public/
│   ├── css/
│   │   └── style.css         # Styles for all pages
│   └── js/
│       ├── login.js          # Login form handling
│       └── dashboard.js      # Dashboard functionality
├── server.js                 # Main application entry point
├── .env                      # Environment variables
├── .env.example              # Environment template
└── database.db               # SQLite database (auto-created)
```

## Next Steps

The authentication system is complete. Future development includes:

1. **Staff Dashboard Features**:
   - View personal schedule
   - View assigned tasks
   - Mark tasks as complete

2. **Admin Dashboard Features**:
   - Create/manage user accounts
   - Assign shifts to staff
   - Create and assign tasks
   - View all schedules

3. **Additional Features**:
   - Calendar view with color coding
   - Dark/light theme toggle
   - User profile management
   - Password change functionality

## Notes

- This is a college capstone project - kept simple and functional
- All passwords are securely hashed (never stored in plain text)
- Session cookies are HTTP-only for security
- The application supports multiple concurrent users
- Database is automatically initialized with test users on first run

