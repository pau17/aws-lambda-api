import { listPeople, registerPeople } from "../services/peopleSevices";
import responsesApi  from "../utils/responsesApi";

export async function getPeople(callback) {
    try {

        var response = await listPeople();
        return callback(null, responsesApi.httpOk(response));

    } catch (err) {
        return callback(null, responsesApi.httpBadRequest(err));
    }
}

export async function postPeople(event, callback) {
    try {

        var response = await registerPeople(JSON.parse(event.body));
        return callback(null, responsesApi.httpOk(response));

    } catch (err) {
        return callback(null, responsesApi.httpBadRequest(err));
    }
}

module.exports = {
    postPeople,
    getPeople,
};
