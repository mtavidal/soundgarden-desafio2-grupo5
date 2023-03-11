const formEl = document.getElementsByTagName('form')[0];

formEl.addEventListener('submit', event => {
    event.preventDefault();

    // const formData = new FormData(formEl);
    // const data = new URLSearchParams(formData);
    
    const data = `{\r\n    \"name\": \"Evento teste 2\",\r\n    \"poster\": \"link da imagem\",\r\n    \"attractions\": [\r\n        \"Cantor 1\"\r\n    ],\r\n    \"description\": \"Evento incrivel\",\r\n    \"scheduled\": \"2022-03-24T00:57:37.761Z\",\r\n    \"number_tickets\": 10\r\n}`
    
    const endpoint = "https://soundgarden-api.vercel.app/events";
    
    fetch(endpoint, {
        method: 'POST',
        body: data,
        redirect: 'follow'
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
});

//     curl --location 'https://soundgarden-api.vercel.app//events' \
// --data '{
    //     "name": "Evento teste 2",
    //     "poster": "link da imagem",
    //     "attractions": [
        //         "Cantor 1"
        //     ],
        //     "description": "Evento incrivel",
        //     "scheduled": "2022-03-24T00:57:37.761Z",
        //     "number_tickets": 10
        // }'
        
        
        // const data = {
            //     "name": document.getElementById("nome").value,
            //     "poster": "link da imagem",
            //     "attractions": ["Bob Marley"],
            //     "description": document.getElementById("descricao").value,
            //     "scheduled": document.getElementById("data").value,
            //     "number_tickets": document.getElementById("lotacao").value
            // };


            // const options = {
            //     method: 'POST',
            //     body: JSON.stringify(data),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // };