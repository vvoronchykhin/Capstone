// Handle login form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');
  
  // Hide previous error messages
  errorMessage.style.display = 'none';
  errorMessage.textContent = '';
  
  // Basic client-side validation
  if (!username || !password) {
    showError('Please enter both username and password');
    return;
  }
  
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Redirect to appropriate dashboard
      window.location.href = data.redirectUrl;
    } else {
      // Show error message
      showError(data.message || 'Invalid username or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    showError('An error occurred during login. Please try again.');
  }
});

// Function to display error messages
function showError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

