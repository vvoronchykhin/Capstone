// Staff Tasks JavaScript - Display assigned tasks

let myTasks = [];

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadMyTasks();
});

// Load tasks assigned to logged-in user
async function loadMyTasks() {
  try {
    const response = await fetch('/api/my-tasks');
    const data = await response.json();
    
    if (data.success) {
      myTasks = data.tasks;
      renderMyTasks();
    } else {
      showError('Error loading tasks');
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
    showError('Error loading tasks. Please refresh the page.');
  }
}

// Render tasks list
function renderMyTasks() {
  const container = document.getElementById('staff-tasks-container');
  
  if (myTasks.length === 0) {
    container.innerHTML = '<p class="empty-text">No tasks assigned yet.</p>';
    return;
  }
  
  container.innerHTML = myTasks.map(task => `
    <div class="task-item staff-task-item ${task.status === 'completed' ? 'task-completed' : ''}">
      <div class="task-info">
        <h4>${escapeHtml(task.title)}</h4>
        ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
        <div class="task-meta">
          <span class="task-status ${task.status === 'completed' ? 'status-completed' : 'status-pending'}">
            Status: <strong>${escapeHtml(task.status)}</strong>
          </span>
          <span class="task-date">Assigned: ${formatDate(task.created_at)}</span>
        </div>
      </div>
      ${task.status !== 'completed' ? `
        <div class="task-actions">
          <button class="btn btn-complete" onclick="markAsComplete(${task.id})">Mark as Complete</button>
        </div>
      ` : ''}
    </div>
  `).join('');
}

// Show error message
function showError(message) {
  const container = document.getElementById('staff-tasks-container');
  container.innerHTML = `<p class="error-text">${escapeHtml(message)}</p>`;
}

// Utility function to escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Mark task as completed
async function markAsComplete(taskId) {
  if (!confirm('Mark this task as completed?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/tasks/${taskId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      loadMyTasks(); // Reload tasks to show updated status
    } else {
      alert(data.message || 'Error marking task as completed');
    }
  } catch (error) {
    console.error('Error completing task:', error);
    alert('Error completing task. Please try again.');
  }
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

