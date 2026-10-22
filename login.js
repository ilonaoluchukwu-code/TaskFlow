document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.getElementById('remember');
  const showBtn = document.querySelector('.show-btn');
  const googleBtn = document.querySelector('.google-btn');
  const forgotLink = document.querySelector('.forgot-link');

  const savedEmail = localStorage.getItem('rememberedEmail');
  if (savedEmail) {
    emailInput.value = savedEmail;
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }

  if (showBtn) {
    showBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showBtn.textContent = 'Hide';
      } else {
        passwordInput.type = 'password';
        showBtn.textContent = 'Show';
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert('Please fill in both email and password');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Demo account
    const demoUser = {
      email: 'demo@taskflow.com',
      password: '123456',
      firstName: 'Demo',
      lastName: 'User'
    };

    // Find user
    let user = users.find(u => u.email === email && u.password === password);

    if (!user && email === demoUser.email && password === demoUser.password) {
      user = demoUser;
    }

    if (user) {
      // Save login status
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', (user.firstName || '') + ' ' + (user.lastName || ''));

      // Remember me
      if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      alert('Login successful!');
      window.location.href = 'tast.html';   // change if your main page has a different name
    } else {
      alert('Invalid email or password');
    }
  });

  // Google button (demo)
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      alert('Google login is not connected yet (demo only)');
    });
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