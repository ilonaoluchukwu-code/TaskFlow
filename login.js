// ===== PASTE YOUR GOOGLE CLIENT ID HERE =====
const GOOGLE_CLIENT_ID = "795211441728-91nlgg3edtosjfr3if65tnelb0cu21hi.apps.googleusercontent.com";
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.getElementById('remember');
  const toggleBtn = document.getElementById('togglePassword');
  const googleBtn = document.querySelector('.google-btn');
  const forgotLink = document.querySelector('.forgot-link');

  // Load remembered email
  const savedEmail = localStorage.getItem('rememberedEmail');
  if (savedEmail) {
    emailInput.value = savedEmail;
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }

  // ===== Show / Hide Password =====
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
      } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
      }
    });
  }

  // ===== Normal Email/Password Login =====
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert('Please fill in both email and password');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const demoUser = {
      email: 'demo@taskflow.com',
      password: '123456',
      firstName: 'Demo',
      lastName: 'User'
    };

    let user = users.find(u => u.email === email && u.password === password);

    if (!user && email === demoUser.email && password === demoUser.password) {
      user = demoUser;
    }

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', (user.firstName || '') + ' ' + (user.lastName || ''));

      if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      alert('Login successful!');
      window.location.href = 'task.html';
    } else {
      alert('Invalid email or password');
    }
  });

  // ===== Real Google Login =====
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      if (GOOGLE_CLIENT_ID === "YOUR_CLIENT_ID_HERE.apps.googleusercontent.com") {
        alert('Please add your Google Client ID first in login.js');
        return;
      }

      // Load Google Identity Services
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      });

      // This opens the real Google account picker
      google.accounts.id.prompt();
    });
  }

  // Handle the response from Google
  function handleGoogleResponse(response) {
    // Decode the JWT token (simple way)
    const data = parseJwt(response.credential);

    // Save the user
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userName', data.name);

    alert('Logged in with Google as ' + data.name);
    window.location.href = 'task.html';
  }

  // Helper to decode Google token
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  // Forgot password
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) {
        alert('Please enter your email first');
        return;
      }
      alert(`Password reset link sent to ${email} (demo)`);
    });
  }
});