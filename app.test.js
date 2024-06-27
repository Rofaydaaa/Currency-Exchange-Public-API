process.env.PORT = '3002';
const request = require('supertest');
const app = require('./app');
const { convertCurrency, convertCurrencyWithAuth } = require('./currencyService');

// Mock the currency service functions
jest.mock('./currencyService', () => ({
    convertCurrency: jest.fn(),
    convertCurrencyWithAuth: jest.fn(),
  }));

describe('Currency Exchange API', () => {
  describe('GET /api-docs', () => {
    it('should return Swagger UI HTML', async () => {
      const res = await request(app).get('/api-docs').redirects(1); // Follow the redirect;
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('<title>Swagger UI</title>');
    });
  });

  describe('POST /api/convert', () => {
    it('should return 400 for invalid request payload', async () => {
      const res = await request(app)
        .post('/api/convert')
        .send({ source: 'inr' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ error: 'Invalid request payload' });
    });

    it('should convert currency without auth and using the token of the server', async () => {
      const source = 'inr';
      const targets = ['usd', 'aed', 'eur'];
      const response = {
        "inr_aed": 0.04393823,
        "inr_eur": 0.011199169,
        "inr_usd": 0.01196412
    }

    convertCurrency.mockResolvedValue(response);

    const res = await request(app)
      .post('/api/convert')
      .send({ source, targets });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(response);
    expect(convertCurrency).toHaveBeenCalledWith(source, targets);
    });
  });

  describe('POST /api/convert-auth', () => {
    it('should return 401 for missing auth token', async () => {
      const res = await request(app)
        .post('/api/convert-auth')
        .send({ source: 'inr', targets: ['usd', 'aed', 'eur'] });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toEqual({ error: 'Authentication required' });
    });

    it('should convert currency with auth', async () => {
      const source = 'inr';
      const targets = ['usd', 'aed', 'eur'];
      const authToken = 'Bearer token';
      const response = {
        "inr_aed": 0.04393823,
        "inr_eur": 0.011199169,
        "inr_usd": 0.01196412
    }

    convertCurrencyWithAuth.mockResolvedValue(response);

    const res = await request(app)
      .post('/api/convert-auth')
      .set('Authorization', authToken)
      .send({ source, targets });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(response);
    expect(convertCurrencyWithAuth).toHaveBeenCalledWith(source, targets, authToken);
    });
  });

  describe('Error Handling', () => {
    it('should return 400 for json formatting errors', async () => {
      const res = await request(app)
        .post('/api/convert')
        .send('{"source": "inr", "targets": ["usd", "aed" ur"]}') // Improper JSON format

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
