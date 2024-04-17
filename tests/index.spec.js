import request from 'supertest';
import app from '../src/app'; // Importa la aplicación Express

describe('POST /api/people/save/:id', () => {
    it('responds with status 200 and returns a success message', async () => {
        const mockData = { name: 'John', age: 30 }; // Datos simulados
        const response = await request(app)
            .post('/api/people/save/123') // ID simulado
            .send(mockData);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({ message: 'Success' }));np
    });

    it('responds with status 400 if there is an error', async () => {
        const response = await request(app)
            .post('/api/people/save/123')
            .send({}); // Envía datos inválidos para provocar un error
        expect(response.status).toBe(400);
    });
});

describe('GET /api/people/list', () => {
    it('responds with status 200 and returns a list of people', async () => {
        const response = await request(app).get('/api/people/list');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array)); // Verifica que la respuesta sea un array
    });

    it('responds with status 400 if there is an error', async () => {
        const response = await request(app).get('/api/people/list');
        expect(response.status).toBe(400);
    });
});