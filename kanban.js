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
    localStorage.setItem("data", JSON.stringify(data));
    // console.log(data);
    return task;
  }

  static updateTask(taskId, updatedInformation) {}

  static deleteTask(taskId) {}

  static getAllTasks() {
    const data = read();
    return data;
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

// function save() {}
