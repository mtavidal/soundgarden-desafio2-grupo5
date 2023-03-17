import { toLocDate } from "./util.js";
import { listEvents, createBooking } from "./crud.js";

document.addEventListener('DOMContentLoaded', async () => {
    const events = await listEvents();

    console.log(events);

function compararDatas(dataEvento){
    let partesData = dataEvento.split("/");
    let dataEventoNew = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    let dataAtual = new Date().setHours(0, 0, 0, 0);;
    if (dataAtual <= dataEventoNew){
        return true;
    }
    return false;
}


function ordernarDatas(a,b){
    let partesData1 = toLocDate(a.scheduled).split("/");
    let partesData2 = toLocDate(b.scheduled).split("/");
    let dataEvento1= new Date(partesData1[2], partesData1[1] - 1, partesData1[0]);
    let dataEvento2 = new Date(partesData2[2], partesData2[1] - 1, partesData2[0]);
    if (dataEvento1 > dataEvento2){
        return -1;
    }
    if (dataEvento1 < dataEvento2){
        return 1;
    }
    return 0;
}


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


    const btnModalReserva = document.getElementsByClassName('btn-modal-reserva');  //Criar o botao pata fazer as reservas
    Array.from(btnModalReserva).forEach(btn => {
        btn.onclick = () => {
            $('#modalReserva').modal();
            const tituloModal = document.getElementById('exampleModalLabel');
            tituloModal.innerHTML = `Reserva para o evento: <b>${btn.getAttribute('evento')}</b>`;
            const eventoId = document.getElementById('eventoId');
            eventoId.value = btn.getAttribute('eventoId');
        };
    });
    //codigo para fazer reserva
    const formModal = document.getElementById("formModal");
    
    formModal.addEventListener('submit', async (e) => {
        e.preventDefault();

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
