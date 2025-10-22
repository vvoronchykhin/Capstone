const express = require('express');
const { body, validationResult } = require('express-validator');
const { getAllUsers, getAllTasks, getTasksByUserId, createTask, deleteTask, updateTaskStatus } = require('../config/database');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users (for assignment dropdown)
router.get('/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// Get all tasks (admin only)
router.get('/tasks', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ success: false, message: 'Error fetching tasks' });
  }
});

// Get tasks for logged-in user (staff)
router.get('/my-tasks', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const tasks = await getTasksByUserId(userId);
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    res.status(500).json({ success: false, message: 'Error fetching tasks' });
  }
});

// Create a new task
router.post('/tasks', [
  isAuthenticated,
  isAdmin,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().optional(),
  body('assignedTo').optional().isInt().withMessage('Invalid user ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid title' 
      });
    }

    const { title, description, assignedTo } = req.body;
    const result = await createTask(title, description, assignedTo);
    
    res.json({ 
      success: true, 
      message: 'Task created successfully',
      taskId: result.id
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ success: false, message: 'Error creating task' });
  }
});

// Delete a task
router.delete('/tasks/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTask(id);
    
    if (result.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Task deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ success: false, message: 'Error deleting task' });
  }
});

// Mark task as completed
router.patch('/tasks/:id/complete', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateTaskStatus(id, 'completed');
    
    if (result.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Task marked as completed' 
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ success: false, message: 'Error updating task' });
  }
});

module.exports = router;

