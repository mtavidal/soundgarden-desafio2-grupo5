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
        alert('Ocorreu um erro!')
    }
}
listarEvento();

form.onsubmit = async (evento) => {
    evento.preventDefault();

    try {
        const atualizarEvento = {
            name: inputName.value,
            poster: inputBanner.value,
            attractions: inputAtracoes.value.split(","),
            description: inputDescricao.value,
            scheduled: inputData.value,
            number_tickets: inputLotacao.value,
        };
    
        const options = {
            method: "PUT",
            body: JSON.stringify(atualizarEvento),
            headers: { "Content-Type": "application/json" },
            redirect: "follow",
        };
    
        const resposta = await fetch(`${URL}/events/${id}`, options);
        if (resposta.status == 200) {
            alert("Evento atualizado com sucesso!!");
            window.location.href = "admin.html";
        }
    }
    catch(error) {
        alert('Ocorreu um erro, revise os dados')
    }
};
