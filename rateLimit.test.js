process.env.PORT = '3001';
process.env.RATE_LIMIT_WINDOW_MS = '60000'; // 1 minute for testing
process.env.RATE_LIMIT_MAX_REQUESTS = '4'; // 4 requests max (2 for first test and 2 for second test)

const app = require('./app');
const request = require('supertest');

describe('Rate Limiting Middleware', () => {
    it('should allow requests within the rate limit', async () => {
      // Send 2 requests within the limit
      const res1 = await request(app).post('/api/convert').send({ source: 'inr', targets: ['usd'] });
      const res2 = await request(app).post('/api/convert').send({ source: 'inr', targets: ['usd'] });
  
      // Both requests should succeed
      expect(res1.status).toBe(200);
      expect(res2.status).toBe(200);
    });
    it('should limit requests exceeding the rate limit (only 2 requests/minute)', async () => {
      const promises = Array.from({ length: 3 }, () => request(app).post('/api/convert').send({ source: 'inr', targets: ['usd'] }));
  
      const responses = await Promise.all(promises);
  
      // First two requests should succeed
      expect(responses[0].status).toBe(200);
      expect(responses[1].status).toBe(200);
  
      // Third request should be rate limited
      expect(responses[2].status).toBe(429); // 429 - Too Many Requests
      expect(responses[2].body).toEqual({ error: 'Too many requests from this IP, please try again later.' });
    });
  
  });
