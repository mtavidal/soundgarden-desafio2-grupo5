
const url_string = window.location.href;
const url = new URL(url_string);
const data = url.searchParams.get("eventId");
const nomeEvento = url.searchParams.get("eventName");

function listarReservas(eventId) {
    let endpoint = `https://soundgarden-api.vercel.app/bookings/event/${eventId}`
    fetch(endpoint)
        .then(response => {
           return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                preencherReservaVazia();
            } else {
                preencherReserva(data);
            }
            preencherTitulo(nomeEvento);
        })
        .catch(error => {
            console.error("Requisição falhou com o error: " + error);
            alert("Falha ao buscar reserva do evento de id: " + eventId + ".")
        })

}


function preencherReserva(data){
    let localReserva = document.getElementsByTagName("tbody")[0];
    console.log(data);
    data.forEach(reserva => { 
        localReserva.innerHTML += `
        <tr>
            <td>${reserva.owner_name}</td>
            <td>${reserva.owner_email}</td>
            <td>${reserva.number_tickets}</td>
        </tr>` 
    });
  
    console.log(localReserva);
}

function preencherReservaVazia(){
    let localReservaVazia = document.getElementsByTagName("tbody")[0];
    localReservaVazia.innerHTML = ` <tr>
    <td>Sem reserva para esse evento</td>
    <td> - </td>
    <td> - </td>
    </tr>`;
}

function preencherTitulo(evento){
    let localTitulo = document.querySelector(".my-5 > h2")
    localTitulo.textContent = ` Reservas do evento: ${evento}.`
}

listarReservas(data);




