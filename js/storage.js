// Manipulando o local storage
storage = {
    getAppStorage: () => {
        try {
            return JSON.parse(localStorage.getItem('tarefas'))
        } catch (error) {
            console.error(error)
            return false
        } 
    },

    createAppStorage: () => {
        localStorage.setItem('tarefas', "{}");
    },

    updateAppStorage: (data) => {
        localStorage.setItem('tarefas', JSON.stringify(data));
    }
}