// State Management
let tasks = [
  { id: 1, title: "Schedule team sync meeting", category: "Work", priority: "Normal", completed: true },
  { id: 2, title: "Grocery shopping for the weekend", category: "Personal", priority: "Normal", completed: true }
];

let currentUser = {
  fullName: "John Doe",
  email: "john@example.com"
};

let currentFilter = "all";


const avatarBtn = document.getElementById("avatarBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const profileModal = document.getElementById("profileModal");
const openProfileBtn = document.getElementById("openProfileBtn");
const closeProfileBtn = document.getElementById("closeProfileBtn");
const cancelProfileBtn = document.getElementById("cancelProfileBtn");
const profileForm = document.getElementById("profileForm");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const categorySelect = document.getElementById("categorySelect");
const prioritySelect = document.getElementById("prioritySelect");
const taskList = document.getElementById("taskList");
const addTaskCard = document.getElementById("addTaskCard");


function getInitials(name) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}


function updateUI() {
  
  avatarBtn.textContent = getInitials(currentUser.fullName);

  
  let filteredTasks = [];
  if (currentFilter === "all") {
    filteredTasks = tasks.filter(t => !t.completed);
  } else if (currentFilter === "work") {
    filteredTasks = tasks.filter(t => !t.completed && t.category.toLowerCase() === "work");
  } else if (currentFilter === "personal") {
    filteredTasks = tasks.filter(t => !t.completed && t.category.toLowerCase() === "personal");
  } else if (currentFilter === "history") {
    filteredTasks = tasks.filter(t => t.completed);
  }

  
  if (currentFilter === "history") {
    addTaskCard.style.display = "none";
    document.getElementById("sectionTitle").textContent = "History";
  } else {
    addTaskCard.style.display = "block";
    document.getElementById("sectionTitle").textContent = 
      currentFilter === "all" ? "All Tasks" : currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
  }

  
  const completedCount = tasks.filter(t => t.completed).length;
  const activeCount = tasks.filter(t => !t.completed).length;

  document.getElementById("countAll").textContent = activeCount;
  document.getElementById("countWork").textContent = tasks.filter(t => !t.completed && t.category === "Work").length;
  document.getElementById("countPersonal").textContent = tasks.filter(t => !t.completed && t.category === "Personal").length;
  document.getElementById("countHistory").textContent = completedCount;

  document.getElementById("completedCounter").textContent = `${completedCount} of ${tasks.length} completed`;

  
  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<div class="empty-state">No tasks found in this section.</div>`;
    return;
  }

  filteredTasks.forEach(task => {
    const item = document.createElement("div");
    item.className = `task-item ${task.completed ? "completed" : ""}`;

    if (currentFilter === "history") {
      item.innerHTML = `
        <div class="task-left">
          <span class="task-text">${task.title}</span>
          <span class="tag ${task.category.toLowerCase()}">${task.category}</span>
        </div>
        <div class="task-right-btns">
          <button type="button" class="restore-btn" onclick="restoreTask(${task.id})">Restore</button>
          <button type="button" class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;
    } else {
      item.innerHTML = `
        <div class="task-left">
          <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})">
          <span class="task-text">${task.title}</span>
          <span class="tag ${task.category.toLowerCase()}">${task.category}</span>
        </div>
        <button type="button" class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      `;
    }

    taskList.appendChild(item);
  });
}


function addTask() {
  const text = taskInput.value.trim();
  if (!text) return; 

  const newTask = {
    id: Date.now(),
    title: text,
    category: categorySelect.value,
    priority: prioritySelect.value,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = ""; 
  updateUI();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed; 
    updateUI();
  }
}

function restoreTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = false; 
    updateUI();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id); 
  updateUI();
}


addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});


avatarBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});

window.addEventListener("click", (e) => {
  if (!avatarBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove("show");
  }
});

openProfileBtn.addEventListener("click", () => {
  dropdownMenu.classList.remove("show");
  document.getElementById("fullNameInput").value = currentUser.fullName;
  document.getElementById("emailInput").value = currentUser.email;
  profileModal.classList.add("show");
});

closeProfileBtn.addEventListener("click", () => profileModal.classList.remove("show"));
cancelProfileBtn.addEventListener("click", () => profileModal.classList.remove("show"));

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentUser.fullName = document.getElementById("fullNameInput").value;
  currentUser.email = document.getElementById("emailInput").value;
  profileModal.classList.remove("show");
  updateUI(); 
});


document.getElementById("logoutBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to log out?")) {
    window.location.href = "login.html";
  }
});


document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.getAttribute("data-filter");
    updateUI();
  });
});


updateUI();