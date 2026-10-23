document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const googleBtn = document.querySelector(".google-btn");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("togglePassword");

  
  if (passwordInput && togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordBtn.textContent = "Hide";
      } else {
        passwordInput.type = "password";
        togglePasswordBtn.textContent = "Show";
      }
    });
  }

  
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = passwordInput.value;

      const savedUserJSON = localStorage.getItem("taskflow_user");

      if (savedUserJSON) {
        const savedUser = JSON.parse(savedUserJSON);

        if (savedUser.email === email && savedUser.password === password) {
          window.location.href = "task.html";
        } else {
          
          const nameFromEmail = email.split("@")[0];
          const newUser = {
            fullName: nameFromEmail,
            email: email,
            password: password
          };
          localStorage.setItem("taskflow_user", JSON.stringify(newUser));
          window.location.href = "task.html";
        }
      } else {
        
        const nameFromEmail = email.split("@")[0];
        const newUser = {
          fullName: nameFromEmail,
          email: email,
          password: password
        };
        localStorage.setItem("taskflow_user", JSON.stringify(newUser));
        window.location.href = "task.html";
      }
    });
  }

  
  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      const googleUser = {
        fullName: "Google User",
        email: "user@gmail.com"
      };

      localStorage.setItem("taskflow_user", JSON.stringify(googleUser));
      window.location.href = "task.html";
    });
  }
});