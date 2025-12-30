const request = require('supertest');
const app = require('./app');

describe('API Endpoints', () => {

    describe('GET /', () => {
        it('should return the static HTML page', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toMatch(/text\/html/);
        });
    });

    describe('GET /health', () => {
        it('should return healthy status', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status', 'healthy');
        });
    });

});
