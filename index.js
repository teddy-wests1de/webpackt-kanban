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
        <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
        <button
          class="bi bi-check-lg update hide"
          data-id="${task.taskId}"
        ></button>
        <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
      </span>
    </div>
    `;
  taskBox[index].appendChild(element);
};

Kanban.getAllTasks().forEach((tasks, index) => {
  tasks.forEach((task) => {
    addTaskCard(task, index);
  });
});

// console.log(Kanban.getAllTasks());
