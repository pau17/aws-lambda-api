const { listPeople, registerPeople } = require("../services/getPeople");
const { httpOk, httpBadRequest } = require("../utils/responsesApi");

module.exports.getPeople = async (callback) => {
    try {

        var response = await listPeople();
        return callback(null, httpOk(response));

    } catch (err) {
        return callback(null, httpBadRequest(err));
    }
};

module.exports.postPeople = async (event, callback) => {
    try {

        var response = await registerPeople(JSON.parse(event.body));
        return callback(null, httpOk(response));

    } catch (err) {
        return callback(null, httpBadRequest(err));
    }
};
