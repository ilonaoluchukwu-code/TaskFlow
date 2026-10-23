document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.signup-form');
  const fullNameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirmPassword'); // ← changed
  const termsCheckbox = document.getElementById('terms');
  const toggleButtons = document.querySelectorAll('.toggle-password'); // ← changed

  // ===== Show / Hide Password =====
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;

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

    // Split full name
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
    window.location.href = 'task.html';
  });

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtns = document.querySelectorAll(".toggle-password");

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const wrapper = btn.closest(".password-wrapper") || btn.parentElement;
      const input = wrapper.querySelector("input");

      if (input) {
        if (input.type === "password") {
          input.type = "text";
          btn.textContent = "Hide";
        } else {
          input.type = "password";
          btn.textContent = "Show";
        }
      }
    });
  });

  
  const signupForm = document.querySelector(".signup-form");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();


      const fullNameInput = document.getElementById("fullname");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirmPassword");

      const fullName = fullNameInput ? fullNameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

      if (!fullName || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

    
      const user = {
        fullName: fullName,
        email: email,
        password: password
      };

      localStorage.setItem("taskflow_user", JSON.stringify(user));

      
      window.location.href = "task.html";
    });
  }
});