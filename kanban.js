export default class Kanban {
  static getTasks(columnId) {
    const data = read().find((column) => {
      return column.columnId === columnId;
    });

    if (!data) {
      return [];
    }
    return data.tasks;
  }

  static insertTask(columnId, content) {
    const data = read();
    const column = data.find((column) => {
      return column.columnId == columnId;
    });

    const task = {
      taskId: Math.floor(Math.random() * 100000),
      content: content,
    };
    column.tasks.push(task);
    save(data);
    // console.log(data);
    return task;
  }

  static updateTask(taskId, updatedInformation) {
    const data = read();

    function findColumnTask() {
      for (const column of data) {
        const task = column.tasks.find((task) => task.taskId == taskId);
        // console.log(task);
        if (task) {
          return [task, column];
        }
      }
    }
    const [task, currentColumn] = findColumnTask();
    // console.log(task);

    const targetColumn = data.find((column) => {
      return column.columnId == updatedInformation.columnId;
    });

    task.content = updatedInformation.content;
    currentColumn.tasks.splice(currentColumn.tasks.indexOf(task));
    targetColumn.tasks.push(task);

    save(data);
  }

  static deleteTask(taskId) {
    const data = read();
    data.map((column) => {
      const task = column.tasks.find((task) => task.taskId == taskId);
      column.tasks.splice(column.tasks.indexOf(task), 1);
    });
    save(data);
    return data;
  }

  static getAllTasks() {
    const data = read();
    columnCount();
    return [data[0].tasks, data[1].tasks, data[2].tasks];
  }
}

function read() {
  const data = localStorage.getItem("data");

  if (!data) {
    return [
      { columnId: 0, tasks: [] },
      { columnId: 1, tasks: [] },
      { columnId: 2, tasks: [] },
    ];
  }
  return JSON.parse(data);
}

function save(data) {
  localStorage.setItem("data", JSON.stringify(data));
  columnCount();
}

const columnCount = function () {
  const data = read();

  const todo = document.querySelector("span.todo");
  todo.textContent = data[0].tasks.length;

  const pending = document.querySelector("span.pending");
  todo.textContent = data[1].tasks.length;

  const completed = document.querySelector("span.completed");
  todo.textContent = data[2].tasks.length;
};

// console.log(Kanban.getAllTasks());
// console.log(Kanban.getTasks(0));
// const data = Kanban.getAllTasks();

// Kanban.insertTask(0, "Record Kanban Lectures");
// console.log(Kanban.deleteTask(68632));
// Kanban.deleteTask();

// console.log(Kanban.getAllTasks());
// Kanban.updateTask(50583, {
//   columnId: 2,
//   content: "Record Javascript...!",
// });
// console.log(Kanban.getAllTasks());
