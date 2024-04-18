const responseBody = (statusCode, data) => {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

const httpResponses = {
    httpOk(data) {
        return responseBody(200, data);
    },

    httpBadRequest(error) {
        return responseBody(400, { error: error });
    },

    httpNotFound() {
        return responseBody(404, { error: 'Not found' });
    }
};

export { httpResponses };