const taskListElement = document.querySelector(".task-list");

let taskList = storage.getAppStorage();

// Obter lista de tarefas
const getTaskList = () => {
  taskListElement.innerHTML = ""; // Resetar conteúdo da div de listagem
  const countTasksElement = document.querySelector("#tasks_count");
  if (taskList !== null && tasks.countTasks() > 0) {
    for (task in taskList) {
      let currentTask = taskList[task];

      let taskStatus = currentTask["done"]
        ? "text-green-600"
        : "text-orange-600";

      let taskContent = `
            <div data-id="${task}" class="task-list-item-view cursor-pointer w-full bg-gradient-to-r from-[#b80959] to-[#D9287A] shadow-md rounded-2xl text-white py-4 px-4 md:px-6 md:py-4 space-y-1 overflow-hidden">
        <div class="flex justify-between items-center">
            <div class="flex flex-col w-3/4 md:w-1/3">
                <h1 class="font-bold text-[0.9rem] md:text-md">${currentTask["name"]}</h1>
                <p class="text-[0.5rem] md:text-xs truncate">
                    ${currentTask["description"]}
                </p>
            </div>
            <div class="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0 bg-gray-100 px-2 md:px-4 py-2.5 rounded-xl md:rounded-2xl">
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
        //tasks.deleteTask(this.getAttribute("data-id"));
        toggleModal("#confirm_delete_task_modal");
        const confirmModelElement = document.querySelector(
          "#confirm_delete_task_modal_btn"
        );
        //console.log(this.getAttribute("data-id"));
        confirmModelElement.setAttribute(
          "data-id",
          this.getAttribute("data-id")
        );
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

    countTasksElement.textContent = tasks.countTasks();
  } else {
    let notFoundTasksContent = `
        <div class="flex flex-col justify-center items-center h-full">
            <img class="w-1/4" draggable="false" src="./assets/images/not-found.webp" alt="Imagem ilustrativa de erro 404 nada encontrado!">
            <h1 class="font-bold text-xl text-gray-700 pt-4 pb-2">Nenhuma tarefa encontrada!</h1>
            <p class="text-gray-500 text-sm">Crie uma agora mesmo clicando no botão "Criar Tarefa" no canto superior direto da tela!</p>
        </div>
        `;
    taskListElement.innerHTML = notFoundTasksContent;

    countTasksElement.textContent = "0";
  }
};

if (taskList) {
  console.log("storage encontrado", taskList);
} else {
  console.log("storage não encontrado");
  storage.createAppStorage();
  getTaskList();
}
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
