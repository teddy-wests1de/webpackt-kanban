import Kanban from "./kanban.js";

const todo = document.querySelector(".cards.todo");
const pending = document.querySelector(".cards.pending");
const completed = document.querySelector(".cards.completed");

const taskBox = [todo, pending, completed];

const addTaskCard = function (task, index) {
  const element = document.createElement("form");
  element.className = "card";
  element.draggable = true;
  element.dataset.id = task.taskId;
  element.innerHTML = `
    <input
      value="${task.content}"
      type="text"
      name="task"
      autocomplete="off"
      disabled="disabled"
    />
    <div>
      <span class="task-id">#${task.taskId}</span>
      <span>
        <button class="bi bi-pencil edit" data-id="${task.taskId}" data-column="${index}"></button>
        <button
          class="bi bi-check-lg update hide"
          data-id="${task.taskId}" data-column="${index}"
        ></button>
        <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
      </span>
    </div>
    `;
  taskBox[index].appendChild(element);
  return index;
};

// addTaskCard();
Kanban.getAllTasks().forEach((tasks, index) => {
  tasks.forEach((task) => {
    addTaskCard(task, index);
  });
});

console.log(Kanban.getAllTasks());

const addForm = document.querySelectorAll(".add");

addForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = Kanban.insertTask(
      form.submit.dataset.id,
      form.task.value.trim()
    );
    addTaskCard(task, form.submit.dataset.id);
    form.reset();
  });
});

taskBox.forEach((column) => {
  column.addEventListener("click", (event) => {
    event.preventDefault();
    const formInput =
      event.target.parentElement.parentElement.previousElementSibling;
    if (event.target.classList.contains("edit")) {
      formInput.removeAttribute("disabled");
      event.target.classList.add("hide");
      event.target.nextElementSibling.classList.remove("hide");
    }
    if (event.target.classList.contains("update")) {
      formInput.setAttribute("disabled", "disabled");
      event.target.classList.add("hide");
      event.target.previousElementSibling.classList.remove("hide");
      const taskId = event.target.dataset.id;
      const columnId = event.target.dataset.column;
      const content = formInput.value;
      console.log(taskId, columnId, content);

      Kanban.updateTask(taskId, {
        columnId: columnId,
        content: content,
      });
    }
    if (event.target.classList.contains("delete")) {
      event.preventDefault();
      formInput.parentElement.remove();
      Kanban.deleteTask(event.target.dataset.id);
    }
  });
});
