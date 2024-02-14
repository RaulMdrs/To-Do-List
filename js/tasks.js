// Manipulando as tarefas
const tasks = {
  
  // Contar tarefas registradas com base na prioridade
  countTasks: (data, priority) => {
    try {
      const itensCounted = [];

      for (item in data) {
        let currentItem = data[item];
        let itemPriority = currentItem["priority"];
  
        if (priority == itemPriority || priority == "all") {
          itensCounted.push(item)
        }
      }
      return itensCounted.length;
    }catch(error){
      console.error(error);
      alert("Erro ao obter número de tarefas. Estamos trabalhando para resolver... ");
    }
  },

  // Criar tarefa
  createTask: (data) => {
    try {
      let nextIndex = Object.keys(taskList).length;
      taskList[nextIndex] = data;
      storage.updateAppStorage(taskList);
      getTaskList(taskListOrderElement.value);
      console.log("Task criada com sucesso!");
      console.table(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar a tarefa! Não se preocupe, estamos a postos para resolver!");
    }
  },

  // Deletar tarefa
  deleteTask: (id) => {
    try {
      delete taskList[id];
      storage.updateAppStorage(taskList);
      getTaskList(taskListOrderElement.value);
      console.log("Task deletada com sucesso! ", id);
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar a tarefa! Não se preocupe, estamos a postos para resolver");
    }
  },

  // Concluir tarefa
  doneTask: (id) => {
    try {
      let taskStatus = taskList[id].done;
      taskStatus = !taskStatus;
      taskList[id].done = taskStatus;
      storage.updateAppStorage(taskList);
      getTaskList(taskListOrderElement.value);
      console.log("Task concluida com sucesso!", id);
    } catch (error) {
      console.error(error);
      alert("Erro ao sair da tarefa! Não se preocupe, estamos a postos para resolver");
    }
  },

  // Visualizar tarefa
  viewTask: (id) => {
    try {
      console.log(id);
      changeViewModalContent(taskList[id]);
      toggleModal("#view_task_modal");
    } catch(error){
      alert("Erro ao visualizar a tarefa! Não se preocupe, estamos a postos para resolver");
    }
  },
};
