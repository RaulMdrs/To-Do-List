// Abrir/Fechar modal
const toggleModal = (id) => {
  const modalElement = document.querySelector(id);
  modalElement.classList.toggle("hidden");

  // Limpar inputs e textareas dos modais conforme encontrados
  try {
    const inputsList = modalElement.querySelectorAll("input, textarea");
    inputsList.forEach((input) => {
      input.value = "";
    });
  } catch (error) {
    console.error("Inputs não encontrados! ", error);
  }
};

const changeViewModalContent = (data) => {
  try {
    const modalNameElement = document.querySelector("#view_task_modal_name");
    const modalDescriptionElement = document.querySelector(
      "#view_task_modal_description"
    );
    const modalStatusElement = document.querySelector(
      "#view_task_modal_status"
    );

    let taskDescription = data["description"]
      ? data["description"]
      : "Nenhuma descrição encontrada!";

    let taskStatus;
    if (!data["done"]) {
      taskStatus = `
        <div
                    class="flex items-center justify-center space-x-2 text-gray-50 bg-orange-600 py-2.5 px-3 rounded-xl w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <span>Pendente</span>
                </div>
        `;
    } else {
      taskStatus = `
      <div
                    class="flex items-center justify-center space-x-2 text-gray-50 bg-green-600 py-2.5 px-3 rounded-xl w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <span>Concluída</span>
                </div>
      `;
    }
    modalNameElement.textContent = data["name"];
    modalDescriptionElement.textContent = taskDescription;
    modalStatusElement.innerHTML = taskStatus;
  } catch (error) {
    console.error(error);
  }
};

// Registrar clique do modal de criação de tarefa
const openCreateTaskModalElement = document.querySelector(
  "#open_create_task_modal"
);
openCreateTaskModalElement.addEventListener("click", function () {
  toggleModal("#create_task_modal");
});
const closeCreateTaskModalElement = document.querySelector(
  "#close_create_task_modal"
);
closeCreateTaskModalElement.addEventListener("click", function () {
  toggleModal("#create_task_modal");
});

// Registrar clique do modal de visualização da tarefa
const closeViewTaskModalElement = document.querySelector(
  "#close_view_task_modal"
);
closeViewTaskModalElement.addEventListener("click", function () {
  toggleModal("#view_task_modal");
});

//Registrar clique do modal de confirmação de exclusão da tarefa
const closeDeleteTaskModalElement = document.querySelector(
  "#close_delete_task_modal"
);
closeDeleteTaskModalElement.addEventListener("click", function () {
  toggleModal("#confirm_delete_task_modal");
});

const confirmDeleteTaskModalElement = document.querySelector(
  "#confirm_delete_task_modal_btn"
);
confirmDeleteTaskModalElement.addEventListener("click", function () {
  toggleModal("#confirm_delete_task_modal");
  tasks.deleteTask(this.getAttribute("data-id"));
});
