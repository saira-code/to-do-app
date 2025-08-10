const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    taskList.innerHTML = saved;
    attachEvents();
  }
}

function attachEvents() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = function () {
      this.parentElement.remove();
      saveTasks();
    };
  });

  document.querySelectorAll('.task-checkbox').forEach(checkbox => {
    checkbox.onchange = function () {
      if (this.checked) {
        this.parentElement.remove(); // Remove the task immediately
        saveTasks();
      }
    };
  });
}

addBtn.onclick = function () {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="task-checkbox">
    <span>${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;
  taskList.appendChild(li);
  taskInput.value = '';
  attachEvents();
  saveTasks();
};

loadTasks();
