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
    const modalDescriptionElement = document.querySelector("#view_task_modal_description");
    const modalStatusElement = document.querySelector("#view_task_modal_status");
    const modalPriorityElement = document.querySelector("#view_task_modal_priority");

    let taskDescription = data["description"] ? data["description"] : "Nenhuma descrição encontrada!";

    let taskStatus;
    if (!data["done"]) {
      taskStatus = `
        <div class="primary-font flex items-center justify-center space-x-2 text-gray-50 bg-orange-600 py-2.5 px-3 rounded-xl w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span>Pendente</span>
        </div>
        `;
    } else {
      taskStatus = `
      <div class="primary-font flex items-center justify-center space-x-2 text-gray-50 bg-green-600 py-2.5 px-3 rounded-xl w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>Concluída</span>
      </div>
      `;
    }

    let taskPriority;
    switch (data["priority"]) {
      case 0:
        taskPriority = `
          <div class="primary-font flex items-center justify-center space-x-2 text-gray-50 bg-green-600 py-2.5 px-3 rounded-xl w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
      
            <span>Prioridade baixa</span>
          </div>`;
        break;

      case 50:
        taskPriority = `
          <div class="primary-font flex items-center justify-center space-x-2 text-gray-50 bg-orange-600 py-2.5 px-3 rounded-xl w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
      
            <span>Prioridade média</span>
          </div>`;
        break;

      case 100:
        taskPriority = `
          <div class="primary-font flex items-center justify-center space-x-2 text-gray-50 bg-red-600 py-2.5 px-3 rounded-xl w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
      
            <span>Prioridade alta</span>
          </div>`;
        break;

      default:
        case 50:
        taskPriority = `
          <div class="primary-font flex items-center justify-center space-x-2 text-gray-50 bg-blue-600 py-2.5 px-3 rounded-xl w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
      
            <span>Prioridade indefinida</span>
          </div>`;
        break;
    }

    modalNameElement.textContent = data["name"];
    modalDescriptionElement.textContent = taskDescription;
    modalStatusElement.innerHTML = taskStatus;
    modalPriorityElement.innerHTML = taskPriority;
  } catch (error) {
    console.error(error);
  }
};

const modals = { 
  openCreateTaskModalElement : {
    modal : "#create_task_modal", 
    button : "#open_create_task_modal"
  }, 
  closeCreateTaskModalElement : {
    modal : "#create_task_modal",
    button : "#close_create_task_modal"
  },
  closeViewTaskModalElement : {
    modal : "#view_task_modal",
    button : "#close_view_task_modal"
  },
  closeDeleteTaskModalElement : {
    modal : "#confirm_delete_task_modal",
    button : "#close_delete_task_modal"
  },
  confirmDeleteTaskModalElement : {
    modal : "#confirm_delete_task_modal",
    button : "#confirm_delete_task_modal_btn"
  }
};

for (let modal in modals) {
  const modalElement = document.querySelector(modals[modal]["button"])
    modalElement.addEventListener("click", function () {
    toggleModal(modals[modal]["modal"]);

    // Se o modal for de deletar task, passamos também a function deleteTaks
    if (modals[modal]["button"] == "#confirm_delete_task_modal_btn") {
      tasks.deleteTask(this.getAttribute("data-id"));
    }
  });
}