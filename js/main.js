const taskListElement = document.querySelector(".task-list");
const taskListOrderElement = document.querySelector(".list-order-filter");

let taskList = storage.getAppStorage();

// Obter lista de tarefas
const getTaskList = (priority) => {
  taskListElement.innerHTML = ""; // Resetar conteúdo da div de listagem
  const countTasksElement = document.querySelector("#tasks_count");
  if (taskList !== null && tasks.countTasks(taskList, priority) > 0) {
    for (task in taskList) {
      let currentTask = taskList[task];

      if (priority == "all" || currentTask["priority"] == priority) {

        let taskStatus;
        let taskThrough = "";

        if (currentTask["done"]) {
          taskStatus = "text-green-600";
          taskThrough = "line-through"
        } else {
          taskStatus = "text-orange-600"
        }
        let taskPriority;

        switch (currentTask["priority"]) {
          case 100:
            taskPriority = "<p class='text-red-600'>Alta</p>";
            break;
          case 50:
            taskPriority = "<p class='text-orange-600'>Média</p>";
            break;
          case 0:
            taskPriority = "<p class='text-green-600'>Baixa</p>";
            break;
          default:
            taskPriority = "<p class='text-blue-500'>Desconhecida</p>";
        }

        let taskContent = `
            <div data-id="${task}" class="task-list-item-view cursor-pointer w-full bg-gradient-to-r from-[#b80959] to-[#D9287A] shadow-md rounded-2xl py-4 px-4 md:px-6 md:py-4 space-y-1">
              <div class="flex justify-between items-center w-full">
                <div class="flex flex-col w-2/4">
                  <h1 class="primary-font font-bold text-[1.1rem] text-gray-100 md:text-md truncate ${taskThrough}">${currentTask["name"]}</h1>
                  <p class="secondary-font text-[0.8rem] md:text-xs text-gray-100 truncate ${taskThrough}">
                    ${currentTask["description"]}
                  </p>
                </div>
                <div class="flex-col md:flex-row space-y-2 md:space-y-0 md:flex md:space-x-4 md:items-center">
                <div class="flex justify-center space-x-2 bg-gray-100 px-2 md:px-4 py-2.5 rounded-xl md:rounded-2xl">
                  <button data-id="${task}" class="task-list-item-done flex items-center justify-center">   
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${taskStatus} w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </button>
                  <button data-id="${task}" class="task-list-item-delete flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-600 w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
                
                <div class="bg-gray-100 rounded-full px-6 py-3">
                  <div class="text-sm font-bold primary-font uppercase">${taskPriority}</div>
                </div>
              </div>
              </div>
            </div>`;

        taskListElement.innerHTML += taskContent;
      }
    }

    // Escutar cliques dos botões de deletar a tarefa
    const deleteButtonElements = document.querySelectorAll(".task-list-item-delete");
    deleteButtonElements.forEach(function (deleteButtonElement) {
      deleteButtonElement.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleModal("#confirm_delete_task_modal");
        const confirmModelElement = document.querySelector("#confirm_delete_task_modal_btn");
        confirmModelElement.setAttribute("data-id", this.getAttribute("data-id"));
      });
    });

    // Escutar cliques dos botões de concluir a tarefa
    const doneButtonElements = document.querySelectorAll(".task-list-item-done");
    doneButtonElements.forEach(function (doneButtonElement) {
      doneButtonElement.addEventListener("click", function (event) {
        event.stopPropagation();
        tasks.doneTask(this.getAttribute("data-id"));
      });
    });

    // Escutar cliques dos botões de visualização da tarefa
    const viewButtonElements = document.querySelectorAll(".task-list-item-view");
    viewButtonElements.forEach(function (viewButtonElement) {
      viewButtonElement.addEventListener("click", function (event) {
        event.stopPropagation();
        tasks.viewTask(this.getAttribute("data-id"));
      });
    });
  } else {
    let notFoundTasksContent = `
        <div class="flex flex-col justify-center items-center pt-12">
            <img class="w-full md:w-1/2" draggable="false" src="./assets/images/not-found.webp" alt="Imagem ilustrativa de erro 404 nada encontrado!">
            <h1 class="primary-font font-bold text-xl text-gray-700 pt-4 pb-2">Nenhuma tarefa encontrada!</h1>
            <p class="secondary-font font-medium text-center text-gray-500 text-xs md:text-sm">Crie uma agora mesmo clicando no botão "Criar Tarefa" no canto superior direto da tela!</p>
        </div>
        `;
    taskListElement.innerHTML = notFoundTasksContent;
  }

  // Atualizar contador de tarefas
  countTasksElement.textContent = tasks.countTasks(taskList, priority);
};

// Verificar existência de armazenamento em Local Storage
if (taskList) {
  console.log("Storage encontrado: ", taskList);
} else {
  console.log("Nenhum storage encontrado!");
  storage.createAppStorage();
  getTaskList("all");
}

taskListOrderElement.addEventListener("change", function(event) {
  getTaskList(event.target.value)
});

window.onload = getTaskList("all");