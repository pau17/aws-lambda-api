import { listPeople, registerPeople } from "../services/peopleServices.js";
import { httpResponses } from "../utils/responsesApi.js";

async function getPeople(event, callback) {
    try {
        const response = await listPeople();
        console.log("imprimiendo response getPeople: " + JSON.stringify(response));

        // Verifica si la respuesta no está vacía
        if (response && response.length > 0) {
            return callback(null, httpResponses.httpOk({ people: response })); 
        } else {
            return callback(null, httpResponses.httpNotFound({ message: 'No se encontraron personas.' }));
        }
    } catch (err) {
        console.error('Error al obtener personas:', err);
        return callback(null, httpResponses.httpBadRequest({ error: 'Error al obtener personas.' }));  
    }
}

async function postPeople(event, callback) {
    try {
        const response = await registerPeople(JSON.parse(event.body));
        return callback(null, httpResponses.httpOk(response));  
    } catch (err) {
        return callback(null, httpResponses.httpBadRequest(err));  
    }
}

export {
    postPeople,
    getPeople,
};