document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.signup-form');
  const fullNameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirm-password');
  const termsCheckbox = document.getElementById('terms');
  const showButtons = document.querySelectorAll('.show-btn');

  // ===== Show / Hide Password (works for both fields) =====
  showButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling; // the password input next to the button

      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Hide';
      } else {
        input.type = 'password';
        btn.textContent = 'Show';
      }
    });
  });

  // ===== Form Submit =====
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;
    const termsAccepted = termsCheckbox.checked;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      alert('You must agree to the Terms & Conditions');
      return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      alert('This email is already registered. Please log in.');
      return;
    }

    // Split full name into first + last (simple way)
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Save new user
    users.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully!');
    window.location.href = 'login.html';
  });
});