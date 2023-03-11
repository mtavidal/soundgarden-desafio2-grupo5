
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
                <h2>${listedEvent.name} - 05/03/2022</h2>
                <h4>${listedEvent.attractions.join(', ')}</h4>
                <p>${listedEvent.description}</p>
                <a href="#" class="btn btn-primary">reservar ingresso</a>
            </article>`
    });
}

listEvents();