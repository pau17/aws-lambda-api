import request from 'supertest';
import  app  from './AmazonApi'; // Ajusta la ruta según la ubicación real de tu archivo principal
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

// Mock DynamoDB
jest.mock('aws-sdk/clients/dynamodb', () => {
  const mockDocumentClient = {
    scan: jest.fn(),
    put: jest.fn()
  };
  return {
    DocumentClient: jest.fn(() => mockDocumentClient)
  };
});

describe('Amazon API Integration Tests', () => {
  describe('GET /dev/list', () => {
    it('should return a list of people', async () => {
      const sampleData = [{ nombre: 'Luke Skywalker', color_cabello: 'blond', masa: '77', createAt: '2024-04-18T19:36:24.626Z', altura: '172', color_piel: 'fair', id: '75c73839-d74c-4cd0-b204-4bb8fdb479a9', color_ojos: 'blue', genero: 'male', anio_nacimiento: '19BBY' }];
      DocumentClient.prototype.scan.mockImplementationOnce((params, callback) => {
        callback(null, { Items: sampleData });
      });

      const response = await request(app).get('/dev/list');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(sampleData);
    });
  });

  describe('POST /dev/save/:id', () => {
    it('should register a person', async () => {
      const requestBody = { nombre: 'Leia Organa' }; // Datos de ejemplo
      const sampleResponse = { message: 'Person registered successfully' }; // Respuesta de ejemplo
      DocumentClient.prototype.put.mockImplementationOnce((params, callback) => {
        callback(null, {});
      });

      const response = await request(app).post('/dev/save/1').send(requestBody);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(sampleResponse);
    });
  });
});
