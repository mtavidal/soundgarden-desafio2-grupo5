const inputName = document.getElementById('nome');
const inputBanner = document.getElementById('banner');
const inputAtracoes = document.getElementById('atracoes');
const inputDescricao = document.getElementById('descricao');
const inputData = document.getElementById('data');
const inputLotacao = document.getElementById('lotacao');
const inputBtn = document.querySelector('btn btn-primary');
const form = document.querySelector('form');

const URL = 'https://soundgarden-api.vercel.app';


const id = new URLSearchParams(window.location.search).get("eventId");

async function listarEvento() {
    try {
        const options = {
            method: "GET",
            redirect: "follow",
            headers: { "Content-Type": "application/json" },
        };
        const resposta = await fetch(`${URL}/events/${id}`, options);
    
        const conteudoResposta = await resposta.json();
        inputName.value = conteudoResposta.name;
        inputBanner.value = conteudoResposta.poster;
        inputAtracoes.value = conteudoResposta.attractions;
        inputDescricao.value = conteudoResposta.description;
        inputData.value = conteudoResposta.scheduled.slice(0, 16);
        inputLotacao.value = conteudoResposta.number_tickets;
    }
    catch(error) {
        console.log(error)
    }
}
listarEvento();

form.onsubmit = async (evento) => {
    evento.preventDefault();

    try {
        const del = {
            method: "DELETE",
            headers: { "Content-Type" : "application/json" },
            redirect: "follow",
        };
        const response = await fetch(`${URL}/events/${id}`, del);
        if (response.status === 204) {
            alert('Evento excluído com sucesso!');
            window.location.href = "admin.html"
        }
    }
    catch(error) {
        console.log(error)
    }
};