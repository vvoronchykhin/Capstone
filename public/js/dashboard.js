// Handle logout button click
document.getElementById('logout-btn').addEventListener('click', async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Redirect to login page
      window.location.href = data.redirectUrl;
    } else {
      alert('Error logging out. Please try again.');
    }
  } catch (error) {
    console.error('Logout error:', error);
    alert('An error occurred during logout. Please try again.');
  }
});

