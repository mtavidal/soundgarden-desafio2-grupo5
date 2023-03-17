const formEl = document.getElementsByTagName('form')[0];

function toISO8601(dateString) {
    let dateParts = dateString.split(' '),
        date = dateParts[0],
        time = dateParts[1];

    let dateFormatted = date.split('/').reverse().join('-');
    let timeFormatted = time + ':00';

    return '20' + dateFormatted + 'T' + timeFormatted + 'Z';
}

function splitAttractions(attractions) {
    let attractionsList = attractions.split(',');

    attractionsList.forEach(function (attraction, index, array) {
        array[index] = attraction.trim();
    });

    return attractionsList;
}


formEl.addEventListener('submit', event => {
    event.preventDefault();
    const endpoint = "https://soundgarden-api.vercel.app/events";

    // const formData = new FormData(formEl);
    // const data = new URLSearchParams(formData);

    const date = document.getElementById("data").value;
    const isoDate = toISO8601(date);

    let attractions = document.getElementById("atracoes").value;
    let attractionsList = splitAttractions(attractions);

    const data = {
        "name": document.getElementById("nome").value,
        "poster": "https://media.discordapp.net/attachments/1084089420199755928/1084144639889658027/fiesta.png",
        "attractions": attractionsList,
        "description": document.getElementById("descricao").value,
        "scheduled": isoDate,
        "number_tickets": document.getElementById("lotacao").value
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    })
    //rafa, aqui adicionei o tratamento pra em caso de erro no cadastro aparecer um alert de erro, e não de sucesso
        .then(res => {
            if (!res.ok) {
                let err = new Error("HTTP status code: " + res.status);
                err.response = res;
                err.status = res.status;
                throw err;
            }
            return res.json();
            // res.json();
            // alert("Evento inserido com sucesso!");
        })
        .then(data => {
            alert("Evento inserido com sucesso! ID do evento: " + data._id + ".");
            window.location.href = "admin.html"; //rafa, aqui adicionei esse comando pra quando finalizar o cadastro voltar automaticamente pra admin
        })
        .catch(error => {
            alert("Falha ao cadastrar o Evento! Verifique os dados (ex: formato data).")
            console.log(error)
        });

    console.log(JSON.stringify(data))
});