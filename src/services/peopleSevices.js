import { DynamoDBClient, ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import fetch from 'node-fetch';
import { httpResponses } from '../utils/responsesApi'; // Importa httpResponses desde responsesApi.js

const dbClient = new DynamoDBClient();

const listPeople = () => {
    return new Promise(async (resolve, reject) => {
        const params = {
            TableName: 'PeopleSwapiTable'
        };

        try {
            const command = new ScanCommand(params);
            const { Items } = await dbClient.send(command);
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

            resolve(httpResponses.httpOk({ // Utiliza httpOk de httpResponses
                statusCode: 200,
                body: "Datos guardados en DynamoDB exitosamente."
            }));
        } catch (error) {
            console.error("Error al procesar y guardar los datos:", error.message);
            reject(httpResponses.httpBadRequest({ // Utiliza httpBadRequest de httpResponses
                statusCode: 500,
                body: JSON.stringify(error.message)
            }));
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
    const params = {
        TableName: "PeopleSwapiTable",
        Item: data,
    };

    try {
        const command = new PutItemCommand(params);
        await dbClient.send(command);
    } catch (error) {
        throw new Error(`Error al guardar los datos en DynamoDB: ${error.message}`);
    }
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
    }, {});
}

export {
    listPeople,
    registerPeople,
};