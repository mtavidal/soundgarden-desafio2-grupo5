function toLocDate(isoDate) {  // pegar a data formatada 
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR');
}

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


function listEvents() {
    const endpoint = 'https://soundgarden-api.vercel.app/events';
    fetch(endpoint, { redirect: 'follow' })
        .then(res => res.json())
        .then(data => fillArticles(data))
        .catch(error => console.log(error));
}

function fillArticles(data) {
    const articlesContainer = document.querySelector('#lista3eventos');
    const dataSorted = data.sort(ordernarDatas);
    dataSorted.slice(0, 6).forEach(listedEvent => {
        if(compararDatas(toLocDate(listedEvent.scheduled))){
            articlesContainer.innerHTML +=
                `<article class="evento card p-5 m-3 cardEvento">
                    <img src="${listedEvent.poster}">
                    <h2>${listedEvent.name} - ${toLocDate(listedEvent.scheduled)}</h2>
                    <h4>${listedEvent.attractions.join(', ')}</h4>
                    <p>${listedEvent.description}</p>
                    <a class="btn btn-primary btn-modal-reserva" evento="${listedEvent.name}" eventoId="${listedEvent._id}" >reservar ingresso</a>
                </article>`
        }

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
}

// fazer reserva
const formModal = document.getElementById('formModal');  // fazer reserva
formModal.addEventListener('submit', event => {
    event.preventDefault();
    const endpoint = 'https://soundgarden-api.vercel.app/bookings';
    const data = {
        event_id: document.getElementById('eventoId').value,
        owner_name: document.getElementById('nome').value,
        owner_email: document.getElementById('email').value,
        number_tickets: document.getElementById('tickets').value,
    };
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow',
    })
        .then(res => {
            if (!res.ok) {
                const err = new Error(`HTTP status code: ${res.status}`);
                err.response = res;
                err.status = res.status;
                throw err;
            }
            return res.json();
        })
        .then(data => {
            alert(`Reserva realizada com sucesso! ID reserva: ${data._id}.`);
            $('#modalReserva').modal('hide');
            formModal.reset();
        })
        .catch(error => {
            alert('Falha ao cadastrar reserva! Verifique seus dados e disponibilidade de ingressos.');
            console.log(error);
        });
});

listEvents();


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
