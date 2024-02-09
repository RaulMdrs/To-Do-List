const taskListElement = document.querySelector(".task-list");

let taskList = storage.getAppStorage();
if (taskList) {
  console.log("storage encontrado", taskList);
} else {
  console.log("storage não encontrado");
  storage.createAppStorage();
  getTaskList();
}

// Obter lista de tarefas
const getTaskList = () => {
  taskListElement.innerHTML = ""; // Resetar conteúdo da div de listagem

  if (tasks.countTasks() > 0) {
    for (task in taskList) {
      let currentTask = taskList[task];

      let taskStatus = currentTask["done"]
        ? "text-green-600"
        : "text-orange-600";

      let taskContent = `
            <div data-id="${task}" class="task-list-item-view cursor-pointer w-full bg-gradient-to-r from-[#b80959] to-[#D9287A] shadow-md rounded-2xl text-white px-6 py-4 space-y-1 overflow-hidden">
        <div class="flex justify-between items-center">
            <div class="flex flex-col w-1/3">
                <h1 class="font-bold">${currentTask["name"]}</h1>
                <p class="text-xs truncate">
                    ${currentTask["description"]}
                </p>
            </div>
            <div class="flex space-x-4 bg-gray-100 px-4 py-2.5 rounded-2xl">
                <button data-id="${task}" class="task-list-item-done flex items-center justify-center">   
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${taskStatus} w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
                <button data-id="${task}" class="task-list-item-delete flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="text-red-600 w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
        
        `;

      taskListElement.innerHTML += taskContent;
    }

    // Escutar cliques dos botões de deletar a tarefa
    const deleteButtonElements = document.querySelectorAll(
      ".task-list-item-delete"
    );
    deleteButtonElements.forEach(function (deleteButtonElement) {
      deleteButtonElement.addEventListener("click", function (event) {
        event.stopPropagation();
        tasks.deleteTask(this.getAttribute("data-id"));
      });
    });

    // Escutar cliques dos botões de concluir a tarefa
    const doneButtonElements = document.querySelectorAll(
      ".task-list-item-done"
    );
    doneButtonElements.forEach(function (doneButtonElement) {
      doneButtonElement.addEventListener("click", function (event) {
        event.stopPropagation();
        tasks.doneTask(this.getAttribute("data-id"));
      });
    });

    // Escutar cliques dos botões de visualização da tarefa
    const viewButtonElements = document.querySelectorAll(
      ".task-list-item-view"
    );
    viewButtonElements.forEach(function (viewButtonElement) {
      viewButtonElement.addEventListener("click", function (event) {
        event.stopPropagation();
        tasks.viewTask(this.getAttribute("data-id"));
      });
    });
  } else {
    let notFoundTasksContent = `
        <div class="flex flex-col justify-center items-center h-full">
            <img class="w-1/4" draggable="false" src="./assets/images/not-found.webp" alt="Imagem ilustrativa de erro 404 nada encontrado!">
            <h1 class="font-bold text-xl text-gray-700 pt-4 pb-2">Nenhuma tarefa encontrada!</h1>
            <p class="text-gray-500 text-sm">Crie uma agora mesmo clicando no botão "Criar Tarefa" no canto superior direto da tela!</p>
        </div>
        `;
    taskListElement.innerHTML = notFoundTasksContent;
  }

  // Atualizar contador de tasks do cabeçalho
  const countTasksElement = document.querySelector("#tasks_count");
  countTasksElement.textContent = tasks.countTasks();
};

// Manipulando as tasks
const tasks = {
  // Contar tarefas
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
    toggleModal("#view_task_modal");
  },
};

// REMOVER - EXEMPLOS
/*tasks.createTask(
    {
        "name": "Completar relatório mensal",
        "description": "Criar relatório mensal contendo análise de desempenho, métricas-chave e recomendações para o próximo mês.",
        "done": false
    }
)
tasks.createTask(
    {
        "name": "Agendar reunião de equipe",
        "description": "Agendar reunião de equipe para discutir os objetivos do trimestre, atribuir tarefas e alinhar estratégias.",
        "done": false
    }
)
tasks.createTask(
    {
        "name": "Revisar propostas de projeto",
        "description": "Revisar e dar feedback sobre as propostas de projeto recebidas, priorizando aquelas alinhadas com os objetivos da empresa.",
        "done": false
    }
)*/

window.onload = getTaskList();
