// Manipulando o local storage do browser
const storage = {

    // Obter valor JSON armazenado em local storage convertido em objeto para leitura
    getAppStorage: () => {
        try {
            return JSON.parse(localStorage.getItem('tarefas'))
        } catch (error) {
            console.error(error)
            return {}
        }
    },

    // Criar armazenamento em local storage com JSON vazio
    createAppStorage: () => {
        localStorage.setItem('tarefas', "{}");
    },

    // Registrar novo objeto convertido para JSON no local storage (Objeto recebido como parâmetro)
    updateAppStorage: (data) => {
        localStorage.setItem('tarefas', JSON.stringify(data));
    }
}