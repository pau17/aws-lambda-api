const AWS = require("aws-sdk");
const DynamoDB = require("aws-sdk/clients/dynamodb");

const dbClient = new DynamoDB.DocumentClient();

const listPeople = () => {
    return new Promise(async (resolve, reject) => {
        const params = {
            TableName: 'PeopleSwapiTable'
        };

        try {
            const { Items } = await dbClient.scan(params).promise();
            return resolve(Items);
        } catch (err) {
            console.log('people list: ', err);
            return reject('Error list people');
        }
    });
}

const registerPeople = (event) => {
    return new Promise(async (resolve, reject) => {
        try {
            const peopleId = event.pathParameters?.id || "";
            const data = await getPeopleSwapiApi(peopleId);
            await postPeopleDynamoDB(data);

            resolve({
                statusCode: 200,
                body: "Datos guardados en DynamoDB exitosamente."
            });
        } catch (error) {
            console.error("Error al procesar y guardar los datos:", error.message);
            reject({
                statusCode: 500,
                body: JSON.stringify(error.message)
            });
        }
    });
};


const getPeopleSwapiApi = async (peopleId) => {
    const swapiApi = `https://swapi.dev/api/people/${peopleId}`;
    
    try {
        const response = await fetch(swapiApi);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de SWAPI');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error al obtener los datos de SWAPI: ${error.message}`);
    }
};

const postPeopleDynamoDB = async (data) => {
    const id = v4();
    const translatedData = translateAttributes(data);
    translatedData.id = id;

    const params = {
    TableName: "PeopleSwapiTable",
    Item: translatedData,
    };

    await DynamoDB.put(params).promise();
};

const translateAttributes = (data) => {
const mapeo = {
    name: "nombre",
    height: "altura",
    mass: "masa",
    hair_color: "color_cabello",
    skin_color: "color_piel",
    eye_color: "color_ojos",
    birth_year: "anio_nacimiento",
    gender: "genero",
    };
    return Object.keys(data).reduce((obj, key) => {
        obj[mapeo[key] || key] = data[key];
        return obj;
    }, 
    {});
}

module.exports = {
    listPeople,
    registerPeople,
};