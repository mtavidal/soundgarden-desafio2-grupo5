//CRUD de eventos
export async function listEvents() {
    try {
        const endpoint = 'https://soundgarden-api.vercel.app/events';
        const response = await fetch(endpoint);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Requisição falhou com o erro: " + error);
    }

}

export async function createEvent(eventToCreate) {
    try {
        const endpoint = "https://soundgarden-api.vercel.app/events";

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(eventToCreate)
        });

        if (response.status == 201) {
            alert("Evento criado com sucesso! Retornando para a página de admin...");
            window.location.href = '/admin.html';
        }

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function readEvents() {
    try {
        const endpoint = 'https://soundgarden-api.vercel.app/events';
        const response = await fetch(endpoint);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function readEvent(uuid) {
    try {
        const endpoint = `https://soundgarden-api.vercel.app/events/${uuid}`;
        const response = await fetch(endpoint)

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export async function updateEvent(eventToUpdate, uuid) {
    try {
        const endpoint = `https://soundgarden-api.vercel.app/events/${uuid}`;

        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(eventToUpdate)
        });

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function deleteEvent(uuid) {
    try {
        const endpoint = `https://soundgarden-api.vercel.app/events/${uuid}`;
        const response = await fetch(endpoint, { method: 'DELETE' })

        if (response.status == 204) {
            alert("Evento excluido com sucesso! Retornando para a página de admin...");
            window.location.href = '/admin.html';
        }

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

//CRUD de reservas
export async function listBookings(uuid) {
    try {
        let endpoint = `https://soundgarden-api.vercel.app/bookings/event/${uuid}`
        const response = await fetch(endpoint);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Requisição falhou com o erro: " + error);
        alert("Falha ao buscar reserva do evento de id: " + uuid + ".")
    }
}

export async function createBooking(bookingToCreate) {
    try {
        const endpoint = "https://soundgarden-api.vercel.app/bookings";

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(bookingToCreate)
        });

        if (response.status == 201) {
            alert("Reserva criada com sucesso!");
            $('#modalReserva').modal("hide");
            formModal.reset();
        }

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}