const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("itmes");

const createTaskElement = (taskText , completed = false) => {
  const li = document.createElement("li");
  li.classList.add("item");

  if (completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    updateLocalStorage()
});

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>`;
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage(); 
});


  li.append(checkbox, span, deleteBtn);
  return li;
};

const addTask = (event) => {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  taskList.appendChild(createTaskElement(taskText));
  taskInput.value = "";
  updateLocalStorage();
};

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask(e);
});

const getTasksLocalStorage = () => JSON.parse(localStorage.getItem("tasks")) || [];
const saveTasksToLocalStorage = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));

const updateLocalStorage = () => {
    const tasks = [];
    document.querySelectorAll(".item").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    saveTasksToLocalStorage(tasks);
};

getTasksLocalStorage().forEach(task => {
    taskList.appendChild(createTaskElement(task.text, task.completed));
});