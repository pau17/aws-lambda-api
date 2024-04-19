import { postPeople, getPeople } from "/../src/api/amazonApi.js";
import { listPeople, registerPeople } from '../src/services/peopleServices';
import { httpResponses } from '../src/utils/responsesApi';

// Mock de la función listPeople para simular su comportamiento
jest.mock('../src/services/peopleServices', () => ({
  listPeople: jest.fn(),
  registerPeople: jest.fn(),
}));

// Inicia la suite de pruebas
describe('People Handlers', () => {
  // Prueba la función getPeople
  describe('getPeople', () => {
    it('should return list of people if exist', async () => {
      // Mock de la respuesta de listPeople
      listPeople.mockResolvedValue([
        {
          nombre: 'C-3PO',
          color_cabello: 'n/a',
          masa: '75',
          createAt: '2024-04-18T22:37:56.035Z',
          altura: '167',
          color_piel: 'gold',
          id: 'e8c20e12-87bd-4841-aa52-1b2df8beec96',
          color_ojos: 'yellow',
          genero: 'n/a',
          anio_nacimiento: '112BBY'
        },
        // Otros objetos de personas simuladas
      ]);

      // Mock de la función de callback
      const callback = jest.fn();

      // Ejecuta la función getPeople
      await getPeople({}, {}, callback);

      // Verifica si la función listPeople fue llamada
      expect(listPeople).toHaveBeenCalled();

      // Verifica si la función de callback fue llamada con la respuesta esperada
      expect(callback).toHaveBeenCalledWith(null, httpResponses.httpOk({ people: listPeople.mock.results[0].value }));
    });

    // Agrega más pruebas para otros escenarios
  });

  // Prueba la función postPeople
  describe('postPeople', () => {
    it('should register a new person', async () => {
      // Mock de la función de callback
      const callback = jest.fn();

      // Ejecuta la función postPeople con datos simulados
      await postPeople({ body: JSON.stringify({ /* Datos simulados para el registro */ }) }, {}, callback);

      // Verifica si la función registerPeople fue llamada con los datos correctos
      expect(registerPeople).toHaveBeenCalledWith(expect.objectContaining({ /* Datos esperados */ }));

      // Verifica si la función de callback fue llamada con la respuesta esperada
      expect(callback).toHaveBeenCalledWith(null, httpResponses.httpOk(expect.any(Object))); // Ajusta el matcher según la respuesta esperada
    });

    // Agrega más pruebas para otros escenarios
  });
});