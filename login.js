let isLoginMode = true; 

document.getElementById('switchMode').addEventListener('click', () => {
  isLoginMode = !isLoginMode;
  const button = document.getElementById('authSubmit');
  button.textContent = isLoginMode ? 'Login' : 'Register';
  document.getElementById('switchMode').textContent = isLoginMode ? 'Switch to Register' : 'Switch to Login';
});

document.getElementById('authForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (isLoginMode) {
    login(email, password);
  } else {
    register(email, password);
  }
});

function register(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some(user => user.email === email);

  if (userExists) {
    alert('User already exists!');
    return;
  }

  const newUser = { email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful!');

  localStorage.setItem('currentUser', JSON.stringify(newUser));

  window.location.href = 'account.html'; 
}

// Login
function login(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    alert('Login successful!');

    localStorage.setItem('currentUser', JSON.stringify(user));

    window.location.href = 'account.html'; 
  } else {
    alert('Invalid email or password!');
  }
}