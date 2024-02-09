// Abrir/Fechar modal
const toggleModal = (id) => {
    const modalElement = document.querySelector(id);
    modalElement.classList.toggle("hidden");
}

// Registrar clique do modal de criação de tarefa
const openCreateTaskModalElement = document.querySelector("#open_create_task_modal")
openCreateTaskModalElement.addEventListener('click', function () {
    toggleModal("#create_task_modal")
});
const closeCreateTaskModalElement = document.querySelector("#close_create_task_modal")
closeCreateTaskModalElement.addEventListener('click', function () {
    toggleModal("#create_task_modal")
});

// Registrar clique do modal de visualização da tarefa
const closeViewTaskModalElement = document.querySelector("#close_view_task_modal")
closeViewTaskModalElement.addEventListener('click', function () {
    toggleModal("#view_task_modal")
});