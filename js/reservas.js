import { listBookings } from "./crud.js";

const url_string = window.location.href;
const url = new URL(url_string);
const eventId = url.searchParams.get("eventId");
const nomeEvento = url.searchParams.get("eventName");
const lotacao = url.searchParams.get("lotacao");

document.addEventListener('DOMContentLoaded', async () => {
    const bookings = await listBookings(eventId);

    function preencherReserva(bookings) {
        let localReserva = document.getElementsByTagName("tbody")[0];
        console.log(bookings);
        bookings.forEach(reserva => {
            localReserva.innerHTML += `
            <tr>
                <td>${reserva.owner_name}</td>
                <td>${reserva.owner_email}</td>
                <td>${reserva.number_tickets}</td>
            </tr>`
        });
    
        console.log(localReserva);
    }

    function preencherReservaVazia() {
        let localReservaVazia = document.getElementsByTagName("tbody")[0];
        localReservaVazia.innerHTML = ` <tr>
        <td>Sem reserva para esse evento</td>
        <td> - </td>
        <td> - </td>
        </tr>`;
    }
    
    function preencherTitulo(evento) {
        let localTitulo = document.querySelector(".my-5 > h2")
        localTitulo.textContent = ` Reservas do evento: ${evento}.`
    }
    

    if (bookings.length === 0) {
        preencherReservaVazia();
    } else {
        preencherReserva(bookings);
    }
    preencherTitulo(nomeEvento);
    
});