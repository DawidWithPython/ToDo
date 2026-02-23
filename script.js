const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <h3>${task.name}</h3>
      <p>${task.description}</p>
      <small>Deadline: ${task.deadline}</small>
      <br>
      <button class="delete-btn" onclick="deleteTask(${index})">Usuń</button>
    `;

    taskList.appendChild(div);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;

  tasks.push({ name, description, deadline });

  saveTasks();
  renderTasks();
  form.reset();
});

renderTasks();


// Rejestracja Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker zarejestrowany"))
    .catch(err => console.error("Błąd SW:", err));
}