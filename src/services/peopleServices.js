import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { httpResponses } from '../utils/responsesApi.js';

const dbClient = new DynamoDBClient();

const listPeople = () => {
    return new Promise(async (resolve, reject) => {
        const params = {
            TableName: 'PeopleSwapiTable'
        };

        try {
            const command = new ScanCommand(params);
            const response = await dbClient.send(command);

            const formattedItems = response.Items.map(item => ({
                nombre: item.nombre.S,
                color_cabello: item.color_cabello.S,
                masa: item.masa.S,
                createAt: item.createAt.S,
                altura: item.altura.S,
                color_piel: item.color_piel.S,
                id: item.id.S,
                color_ojos: item.color_ojos.S,
                genero: item.genero.S,
                anio_nacimiento: item.anio_nacimiento.S
            }));

            console.log("Consulta de tabla DYNAMO: " + JSON.stringify(formattedItems))
            resolve(httpResponses.httpOk({ 
                formattedItems
            }));
        } catch (err) {
            console.log('Error al listar personas: ', err);
            reject('Error al listar personas');  
        }
    });
};

const registerPeople = (event) => {
    return new Promise(async (resolve, reject) => {
        try {
            const peopleId = event.pathParameters?.id || "";
            const data = await getPeopleSwapiApi(peopleId);

            const translatedData = translateAttributes(data);
            await postPeopleDynamoDB(translatedData);

            resolve(httpResponses.httpOk({ 
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
    const swapiApi = 'https://swapi.dev/api/people/' + peopleId;

    try {
        const response = await fetch(swapiApi);
        const responseData = await response.json(); 

        console.log("Se imprime la variable string Objeto json: " + JSON.stringify(responseData));

        if (!response.ok) {
            throw new Error('Error al obtener los datos de SWAPI');
        }

        return responseData;
    } catch (error) {
        throw new Error(`Error al obtener los datos de SWAPI: ${error.message}`);
    }
};

const postPeopleDynamoDB = async (data) => {
    const id = uuidv4();
    const createAt = new Date().toISOString();

    const params = {
        TableName: "PeopleSwapiTable",
        Item: {
            id: { S: id },
            createAt: { S: createAt },
            nombre: { S: data.nombre },
            altura: { S: data.altura },
            masa: { S: data.masa },
            color_cabello: { S: data.color_cabello },
            color_piel: { S: data.color_piel },
            color_ojos: { S: data.color_ojos },
            anio_nacimiento: { S: data.anio_nacimiento },
            genero: { S: data.genero },
        }
    };
    console.log("JSON FINAL: " + JSON.stringify(params));
    try {
        const command = new PutItemCommand(params);
        await dbClient.send(command);
    } catch (error) {
        throw new Error(`Error al guardar los datos en DynamoDB: ${error ? error.message : 'Error desconocido'}`);
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
        if (mapeo[key] && data[key] !== undefined) {
            obj[mapeo[key]] = data[key];
        } else {
            obj[key] = data[key];
        }
        return obj;
    }, {});
}

export { listPeople, registerPeople };