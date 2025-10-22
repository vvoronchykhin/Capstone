// Task Management JavaScript for Admin Dashboard

let users = [];
let tasks = [];

// Load users and tasks when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  loadTasks();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  const addTaskBtn = document.getElementById('add-task-btn');
  const cancelTaskBtn = document.getElementById('cancel-task-btn');
  const taskForm = document.getElementById('task-form');

  addTaskBtn.addEventListener('click', showTaskForm);
  cancelTaskBtn.addEventListener('click', hideTaskForm);
  taskForm.addEventListener('submit', handleTaskSubmit);
}

// Show task form
function showTaskForm() {
  document.getElementById('task-form-container').style.display = 'block';
  document.getElementById('add-task-btn').style.display = 'none';
  document.getElementById('task-title').focus();
}

// Hide task form
function hideTaskForm() {
  document.getElementById('task-form-container').style.display = 'none';
  document.getElementById('add-task-btn').style.display = 'inline-block';
  document.getElementById('task-form').reset();
}

// Load users from API
async function loadUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    
    if (data.success) {
      users = data.users;
      populateUserDropdown();
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

// Populate user dropdown
function populateUserDropdown() {
  const select = document.getElementById('task-assign');
  
  // Clear existing options except the first one
  select.innerHTML = '<option value="">Select a user...</option>';
  
  // Add user options
  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = `${user.username} (${user.role})`;
    select.appendChild(option);
  });
}

// Load tasks from API
async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    
    if (data.success) {
      tasks = data.tasks;
      renderTasks();
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
    document.getElementById('tasks-container').innerHTML = 
      '<p class="error-text">Error loading tasks. Please refresh the page.</p>';
  }
}

// Render tasks list
function renderTasks() {
  const container = document.getElementById('tasks-container');
  
  if (tasks.length === 0) {
    container.innerHTML = '<p class="empty-text">No tasks yet. Create your first task!</p>';
    return;
  }
  
  container.innerHTML = tasks.map(task => `
    <div class="task-item ${task.status === 'completed' ? 'task-completed' : ''}">
      <div class="task-info">
        <h4>${escapeHtml(task.title)}</h4>
        ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
        <div class="task-meta">
          <span class="task-status ${task.status === 'completed' ? 'status-completed' : 'status-pending'}">
            Status: <strong>${escapeHtml(task.status)}</strong>
          </span>
          <span class="task-assigned">
            ${task.username ? `Assigned to: <strong>${escapeHtml(task.username)}</strong>` : 'Unassigned'}
          </span>
          <span class="task-date">Created: ${formatDate(task.created_at)}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="btn btn-delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

// Handle task form submission
async function handleTaskSubmit(e) {
  e.preventDefault();
  
  const formData = {
    title: document.getElementById('task-title').value.trim(),
    description: document.getElementById('task-description').value.trim(),
    assignedTo: document.getElementById('task-assign').value || null
  };
  
  if (!formData.title) {
    alert('Please enter a task title');
    return;
  }
  
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      hideTaskForm();
      loadTasks(); // Reload tasks
    } else {
      alert(data.message || 'Error creating task');
    }
  } catch (error) {
    console.error('Error creating task:', error);
    alert('Error creating task. Please try again.');
  }
}

// Delete a task
async function deleteTask(taskId) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      loadTasks(); // Reload tasks
    } else {
      alert(data.message || 'Error deleting task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Error deleting task. Please try again.');
  }
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

