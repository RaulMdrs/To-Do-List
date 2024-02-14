// Manipulando o local storage do browser
const storage = {

    // Obter valor JSON armazenado em local storage convertido em objeto para leitura
    getAppStorage: () => {
        try {
            return JSON.parse(localStorage.getItem('tarefas'))
        } catch (error) {
            console.error(error)
            localStorage.setItem('tarefas', "{}");
            alert("Erro ao obter as tarefas! Não se preocupe, estamos a postos para resolver");
            return {}
        }
    },

    // Criar armazenamento em local storage com JSON vazio
    createAppStorage: () => {
        try {
            localStorage.setItem('tarefas', "{}");
        } catch(error) {
            console.error(error)
            alert("Erro ao definir a memória para guardar suas tarefas! Não se preocupe, estamos a postos para resolver");
        }
    },

    // Registrar novo objeto convertido para JSON no local storage (Objeto recebido como parâmetro)
    updateAppStorage: (data) => {
        try {
            localStorage.setItem('tarefas', JSON.stringify(data));
        } catch(error) {
            console.error(error)
            alert("Erro ao atualizar os dados das tarefas! Não se preocupe, estamos a postos para resolver");
        }
    }
}