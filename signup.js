
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