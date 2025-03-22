const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Check
if (!currentUser) {
  alert('You are not logged in!');
  window.location.href = 'login.html'; 
} else {
  document.getElementById('userEmail').textContent = currentUser.email || 'Not provided';
  document.getElementById('userName').textContent = currentUser.name || 'Not provided';
}



// Logout
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('currentUser'); 
  alert('You have been logged out.');
  window.location.href = 'login.html'; 
});