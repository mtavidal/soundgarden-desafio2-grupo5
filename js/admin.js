function listarEventosPainel() {
    let endpoint = `https://soundgarden-api.vercel.app/events`
    fetch(endpoint)
        .then(response => {
           return response.json();
        })
        .then(data => {
            preencherListaEventos(data);
        })
        .catch(error => {
            console.error("Requisição falhou com o error: " + error);
        })

}

function preencherListaEventos(data) {
    let localListaEvento = document.getElementsByTagName("tbody")[0];
    data.forEach(evento => { 
        localListaEvento.innerHTML += `
        <tr>
            <th scope="row">${evento._id}</th>
            <td>${formataData(evento.scheduled)}</td>
            <td>${evento.name}</td>
            <td>${evento.attractions.join(', ')}</td>
            <td>
                <a href="reservas.html?eventId=${evento._id}&eventName=${evento.name}" class="btn btn-dark">ver reservas</a>
                <a href="editar-evento.html?eventId=${evento._id}" class="btn btn-secondary">editar</a>
                <a href="excluir-evento.html?eventId=${evento._id}" class="btn btn-danger">excluir</a>
            </td>
        </tr>` 
    });
}

function formataData(dateString) {
    let data = new Date(dateString);
    console.log(data);
    const result = data.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })
    return result;
}

listarEventosPainel() 

