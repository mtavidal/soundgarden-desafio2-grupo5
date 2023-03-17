import { deleteEvent } from "./crud.js";

const form = document.querySelector('#deleteForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = window.location.href;
    const splittedUrl = url.split('eventId=');
    const uuid = splittedUrl[1];
    
    const response = await deleteEvent(uuid);
});