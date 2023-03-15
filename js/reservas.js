
const url_string = window.location.href;
const url = new URL(url_string);
const data = url.searchParams.get("eventId");
const nomeEvento = url.searchParams.get("eventName");
const lotacao = url.searchParams.get("lotacao");

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
    totalIngressos = 0;
    let localReserva = document.getElementsByTagName("tbody")[0];
    console.log(data);
    data.forEach(reserva => { 
        localReserva.innerHTML += `
        <tr>
            <td>${reserva.owner_name}</td>
            <td>${reserva.owner_email}</td>
            <td>${reserva.number_tickets}</td>
        </tr>` 
        totalIngressos += reserva.number_tickets;
    });
    let localTotalReserva = document.getElementsByTagName("tfoot")[0];
    let restantes = lotacao-totalIngressos;
    localTotalReserva.innerHTML = `
        <tr>
            <th>Total lotação: ${lotacao}</th>
            <th>Ingressos restantes: ${restantes<=0 ? "LOTAÇÃO MÁXIMA": restantes}</th>
            <th>Total reservados: ${totalIngressos}</th>
        </tr>`; 
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
    localTitulo.innerHTML = ` <b>Reservas</b> </br></br> Evento: ${evento}.`
}

listarReservas(data);




