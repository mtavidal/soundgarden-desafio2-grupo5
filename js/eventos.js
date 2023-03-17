function toLocDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR');
}

function listEvents() {
    let endpoint = 'https://soundgarden-api.vercel.app/events'
    fetch(endpoint, { redirect: 'follow' })
    .then(res => {
        return res.json();
    })
    .then(data => fillArticles(data))
    .catch(error => console.log(error))
    
}

function fillArticles(data) {
    const articlesContainer = document.querySelector('section > .container:nth-of-type(2)');

    data.forEach(listedEvent => {
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
}

//codigo para fazer reserva
let formModal = document.getElementById("formModal");

formModal.addEventListener('submit', event => {
    event.preventDefault();
    const endpoint = "https://soundgarden-api.vercel.app/bookings";

    const data = {
        "event_id": document.getElementById("eventoId").value,
        "owner_name": document.getElementById("nome").value,
        "owner_email": document.getElementById("email").value,
        "number_tickets":  document.getElementById("tickets").value
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    })
    .then(res => {
        if (!res.ok) {
            let err = new Error("HTTP status code: " + res.status);
            err.response = res;
            err.status = res.status;
            throw err;
        }
        return res.json();
        
    })
    .then(data => {
        alert("Reserva realizada com sucesso! ID reserva: " + data._id +".");
        $('#modalReserva').modal("hide");
        formModal.reset();

    })
    .catch(error => {
        alert("Falha ao cadastrar reserva! Verifique seus dados e disponibilidade de ingressos.")
        console.log(error);
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

listEvents();
