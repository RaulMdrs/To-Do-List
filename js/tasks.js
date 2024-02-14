// Manipulando as tarefas
const tasks = {
  
  // Contar tarefas registradas
  countTasks: () => {
    return Object.keys(taskList).length;
  },

  // Criar tarefa
  createTask: (data) => {
    try {
      console.table(data);

      let nextIndex = Object.keys(taskList).length;
      taskList[nextIndex] = data;
      storage.updateAppStorage(taskList);
      getTaskList();
      console.log("Task criada com sucesso! ", data["name"]);
    } catch (error) {
      console.error(error);
    }
  },

  // Deletar tarefa
  deleteTask: (id) => {
    try {
      delete taskList[id];
      storage.updateAppStorage(taskList);
      getTaskList();
      console.log("Task deletada com sucesso! ", id);
    } catch (error) {
      console.error(error);
    }
  },

  // Concluir tarefa
  doneTask: (id) => {
    try {
      let taskStatus = taskList[id].done;
      taskStatus = !taskStatus;
      taskList[id].done = taskStatus;
      storage.updateAppStorage(taskList);
      getTaskList();
      console.log("Task concluida com sucesso!", id);
    } catch (error) {
      console.error(error);
    }
  },

  // Visualizar tarefa
  viewTask: (id) => {
    console.log(id);
    changeViewModalContent(taskList[id]);
    toggleModal("#view_task_modal");
  },
};
