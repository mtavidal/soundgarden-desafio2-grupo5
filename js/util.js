export function toISO8601(dateString) {
    let dateParts = dateString.split(' '),
        date = dateParts[0],
        time = dateParts[1];

    let dateFormatted = date.split('/').reverse().join('-');
    let timeFormatted = time + ':00';

    return '20' + dateFormatted + 'T' + timeFormatted + 'Z';
}

export function splitAttractions(attractions) {
    let attractionsList = attractions.split(',');

    attractionsList.forEach(function (attraction, index, array) {
        array[index] = attraction.trim();
    });

    return attractionsList;
}

export function toLocDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR');
}

export function formataData(dateString) {
    let data = new Date(dateString);
    console.log(data);
    const result = data.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })
    return result;
}