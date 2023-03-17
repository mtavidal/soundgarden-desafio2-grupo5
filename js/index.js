import { toLocDate } from "./util.js";
import { listEvents, createBooking } from "./crud.js";

document.addEventListener('DOMContentLoaded', async () => {
    const events = await listEvents();

    console.log(events);

    const articlesContainer = document.querySelector('#lista3eventos');

    events.slice(0, 3).forEach(listedEvent => {
        articlesContainer.innerHTML +=
            `<article class="evento card p-5 m-3">
                    <img src="${listedEvent.poster}">
                    <h2>${listedEvent.name} - ${toLocDate(listedEvent.scheduled)}</h2>
                    <h4>${listedEvent.attractions.join(', ')}</h4>
                    <p>${listedEvent.description}</p>
                    <a class="btn btn-primary btn-modal-reserva" evento="${listedEvent.name}" eventoId="${listedEvent._id}"  >reservar ingresso</a>
                </article>`
    });
    //criação do evento do botao reserva
    const btnModalReserva = document.getElementsByClassName("btn-modal-reserva");
    for (let index = 0; index < btnModalReserva.length; index++) {
        btnModalReserva[index].onclick = () => {
            $('#modalReserva').modal();
            let tituloModal = document.getElementById("exampleModalLabel");
            tituloModal.textContent = `Reserva para o evento: ${btnModalReserva[index].getAttribute("evento")}`;
            let eventoId = document.getElementById("eventoId");
            eventoId.value = btnModalReserva[index].getAttribute("eventoId");
        }
    }
    //codigo para fazer reserva
    formModal.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formModal = document.getElementById("formModal");

        const bookingToCreate = {
            "event_id": formModal.eventoId.value,
            "owner_name": formModal.nome.value,
            "owner_email": formModal.email.value,
            "number_tickets": formModal.tickets.value
        };

        const response = await createBooking(bookingToCreate);
    });
});