import { createEvent } from "./crud.js";
import { toISO8601, splitAttractions } from "./util.js";

const formEl = document.getElementsByTagName('form')[0];

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = document.querySelector('#eventForm');
    
    const date = form.data.value;
    const isoDate = toISO8601(date);

    let attractions = form.atracoes.value;
    let attractionsList = splitAttractions(attractions);

    const eventToCreate = {
        "name": form.nome.value,
        "poster": form.poster.value,
        "attractions": attractionsList,
        "description": form.descricao.value,
        "scheduled": isoDate,
        "number_tickets": form.lotacao.value
    };

    const response = await createEvent(eventToCreate);
});