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

  static insertTask(columnId, content) {}

  static updateTask(taskId, updatedInformation) {}

  static deleteTask(taskId) {}

  static getAllTasks() {
    const data = read();
    return data;
  }
}

function read() {
  const data = localStorage.getItem("data");
  return JSON.parse(data);
}

// function save() {}
