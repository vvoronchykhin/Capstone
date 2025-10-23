const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const { getUserByUsername } = require('../config/database');
const { isAuthenticated, isAdmin, isStaff } = require('../middleware/authMiddleware');

const router = express.Router();

// Root route - redirect to appropriate page
router.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    // Redirect based on user role
    if (req.session.userRole === 'admin') {
      return res.redirect('/admin-dashboard');
    } else if (req.session.userRole === 'staff') {
      return res.redirect('/staff-dashboard');
    }
  }
  res.redirect('/login');
});

// Serve login page
router.get('/login', (req, res) => {
  // If already logged in, redirect to appropriate dashboard
  if (req.session && req.session.userId) {
    if (req.session.userRole === 'admin') {
      return res.redirect('/admin-dashboard');
    } else if (req.session.userRole === 'staff') {
      return res.redirect('/staff-dashboard');
    }
  }
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Handle login POST request
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    const { username, password } = req.body;

    // Get user from database
    const user = await getUserByUsername(username);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Create session
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.userRole = user.role;

    // Respond with success and redirect URL
    res.json({ 
      success: true, 
      message: 'Login successful',
      redirectUrl: user.role === 'admin' ? '/admin-dashboard' : '/staff-dashboard'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred during login' 
    });
  }
});

// Handle logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error logging out' 
      });
    }
    res.json({ 
      success: true, 
      message: 'Logged out successfully',
      redirectUrl: '/login'
    });
  });
});

// Staff dashboard route (protected)
router.get('/staff-dashboard', isAuthenticated, isStaff, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/staff-dashboard.html'));
});

// Admin dashboard route (protected)
router.get('/admin-dashboard', isAuthenticated, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin-dashboard.html'));
});

// Task management route (protected - admin only)
router.get('/task-management', isAuthenticated, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/task-management.html'));
});

module.exports = router;

