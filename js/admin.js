import { listEvents } from "./crud.js";
import { formataData } from "./util.js";

document.addEventListener('DOMContentLoaded', async () => {
    const events = await listEvents();

    let localListaEvento = document.getElementsByTagName("tbody")[0];
    events.forEach(evento => {

        localListaEvento.innerHTML += `
        <tr>
            <th scope="row">${++cont}</th>
            <td>${formataData(evento.scheduled)}</td>
            <td>${evento.name}</td>
            <td>${evento.attractions.join(', ')}</td>
            <td>
                <a href="reservas.html?eventId=${evento._id}&eventName=${evento.name}&lotacao=${evento.number_tickets}" class="btn btn-dark">ver reservas</a>
                <a href="editar-evento.html?eventId=${evento._id}" class="btn btn-secondary">editar</a>
                <a href="excluir-evento.html?eventId=${evento._id}" class="btn btn-danger">excluir</a>
            </td>
        </tr>`
    });
});
