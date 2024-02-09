const submitCreateTaskForm = document.querySelector("#createTaskForm");

submitCreateTaskForm.addEventListener("submit", function (event) {
    
    event.preventDefault();

    const formData = new FormData(this);
 
    const createTaskData = {
        "name": formData.get("name"),
        "description": formData.get("description"),
        "done": false
    };

    tasks.createTask(createTaskData);
    toggleModal("#create_task_modal")
})