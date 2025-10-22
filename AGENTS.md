# Project Description

This is a college capstone project for a web application for staff scheduling and task management.

**IMPORTANT**: This is a college capstone project - do not overengineer the solution. Keep it simple and functional.

**Project Requirements**:
- Staff users will be able to log in, view their schedule and see their tasks
- Administrators will be able to create accounts, assign shifts and do daily tasks

**Success Criteria**:
- Staff can log in and view their schedule
- Admin can add/edit shifts and tasks
- Tasks can be marked as completed
- Can be accessed by multiple users at once

**Main Features**:
1. User authentication (login/logout)
2. Staff dashboard
3. Admin dashboard
4. Basic UI
5. Color-coded calendar
6. Dark/light theme support

# Technology Stack Constraints

- Use ONLY the following technologies for this project:
  - Frontend: HTML, CSS, and JavaScript (vanilla JavaScript only, no frameworks)
  - Backend: Node.js with Express
  - Database: SQLite
- Do not use any other frameworks, libraries (except essential npm packages), or databases
- Keep the project simple and avoid adding unnecessary dependencies

# Project Structure

- Organize code into the following directory structure:
  - `config/` - Database configuration and application settings
  - `middleware/` - Custom middleware for authentication, validation, and error handling
  - `routes/` - Express Router modules for different feature areas
  - `public/` - Static assets served directly to the client
    - `public/css/` - Stylesheet files for styling
    - `public/js/` - Client-side JavaScript files
  - `views/` - HTML template files for different pages
- Place the main application entry point as `server.js` in the root directory
- Store the SQLite database file in the root directory as specified in environment variables
- Use a `.env` file for environment-specific configuration (never commit this file)
- Create a `.env.example` file with placeholder values for required environment variables
- Maintain separation of concerns by keeping route logic, middleware, and configuration in separate files
- Use descriptive file names that reflect their purpose (e.g., `authRoutes.js`, `authMiddleware.js`)

# Express.js rules

- Use proper middleware order: body parsers, custom middleware, routes, error handlers
- Organize routes using Express Router for modular code structure
- Use async/await with proper error handling and try/catch blocks
- Create a centralized error handler middleware as the last middleware
- Use environment variables for configuration with a config module
- Implement request validation using libraries like express-validator
- Use middleware for authentication and authorization
- Use appropriate HTTP status codes in responses

# JavaScript rules

- Use const and let instead of var for block-scoped variable declarations
- Apply strict equality (===, !==) instead of loose equality (==, !=)
- Use async/await for asynchronous operations with proper error handling
- Implement proper error handling with try/catch blocks and error propagation
- Use template literals for string interpolation and multi-line strings
- Apply destructuring for cleaner object and array value extraction
- Use arrow functions for callbacks and concise function expressions
- Implement proper null/undefined checks before accessing properties
- Use optional chaining (?.) and nullish coalescing (??) for safer property access
- Apply Array methods (map, filter, reduce) for functional programming patterns
- Use modules (import/export) for code organization and reusability
- Implement proper validation and sanitization of user inputs
- Use meaningful variable and function names that describe intent
- Avoid callback hell by using Promises or async/await
- Use default parameters for function arguments when appropriate

# HTML rules

- Use semantic HTML5 elements (header, nav, main, section, footer) for better structure
- Implement proper heading hierarchy (h1-h6) without skipping levels
- Use alt attributes for all images for accessibility
- Use form labels with proper for attributes linking to input IDs
- Use meta tags for viewport and character encoding
- Avoid inline styles and inline JavaScript for separation of concerns
- Use descriptive class and ID names that reflect purpose not appearance
- Use button elements for actions and anchor tags for navigation

# CSS rules

- Use mobile-first approach with min-width media queries
- Apply CSS Grid for two-dimensional layouts and Flexbox for one-dimensional layouts
- Use CSS custom properties (variables) for theming and reusable values
- Implement consistent naming conventions (BEM, SMACSS, or similar methodology)
- Use relative units (rem, em, %) instead of fixed pixels for responsive design
- Avoid !important declarations unless absolutely necessary
- Use CSS specificity wisely and avoid overly specific selectors
- Implement accessibility considerations (focus states, color contrast)

# Node.js rules

- Use environment variables with dotenv for configuration management
- Implement proper error handling with try/catch for async operations
- Use async/await with Promise-based APIs instead of callbacks
- Apply proper path handling with path.join() for cross-platform compatibility
- Use built-in modules when possible instead of external dependencies
- Implement structured logging for debugging and monitoring
- Avoid blocking the event loop with synchronous operations
- Use proper input validation and sanitization for security

# SQLite rules

- Use prepared statements with parameterized queries to prevent SQL injection
- Implement proper error handling with try/catch for database operations
- Use transactions for multiple related operations to ensure data consistency
- Use appropriate data types (INTEGER, TEXT, REAL, BLOB) for columns
- Implement database connection pooling or reuse connections efficiently
- Avoid storing large files directly in database, use file paths instead