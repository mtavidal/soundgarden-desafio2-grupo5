import { listEvents, createBooking } from "./crud.js";
import { toLocDate } from "./util.js";

document.addEventListener('DOMContentLoaded', async () => {
    const events = await listEvents();
    console.log(events);

    const articlesContainer = document.querySelector('section > .container:nth-of-type(2)');

    events.forEach(listedEvent => {
        articlesContainer.innerHTML +=
            `<article class="evento card p-5 m-3">
                <img src="${listedEvent.poster}">
                <h2>${listedEvent.name} - ${toLocDate(listedEvent.scheduled)}</h2>
                <h4>${listedEvent.attractions.join(', ')}</h4>
                <p>${listedEvent.description}</p>
                <a class="btn btn-primary btn-modal-reserva" evento="${listedEvent.name}" eventoId="${listedEvent._id}" lotacao="${listedEvent.number_tickets}" >reservar ingresso</a>
            </article>`
    });
    //criação do evento do botao reserva
    const btnModalReserva = document.getElementsByClassName("btn-modal-reserva");
    for (let index = 0; index < btnModalReserva.length; index++) {
        btnModalReserva[index].onclick = () => {
            $('#modalReserva').modal();
            let tituloModal = document.getElementById("exampleModalLabel");
            tituloModal.innerHTML = `Reserva para o evento: <b>${btnModalReserva[index].getAttribute("evento")}</b>`;
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

function validaEmail(field) { // validar email
    const email = field.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        document.getElementById('msgemail').innerHTML = '';
        //alert('E-mail válido');
    } else {
        document.getElementById('msgemail').innerHTML = '<font color="red">E-mail inválido</font>';
        //alert('E-mail inválido');
    }
}
