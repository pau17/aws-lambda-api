// responsesApi.js
const responseBody = (code = 502, data = {}) => {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        statusCode: code,
        body: JSON.stringify(data)
    };
}

const httpResponses = {
    httpOk(data = {}) {
        console.log("VER DATA" + JSON.stringify(data));
        return responseBody(200, data);
    },

    httpBadRequest(data = {}) {
        return responseBody(400, data);
    },

    httpNotFound(data = {}) {
        return responseBody(404, data);
    }
};

export { httpResponses };
