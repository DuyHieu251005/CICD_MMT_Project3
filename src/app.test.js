const request = require('supertest');
const app = require('./app');

describe('API Endpoints', () => {

    describe('GET /', () => {
        it('should return welcome message with status 200', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toBe('Hello from CI/CD Pipeline!');
            expect(res.body).toHaveProperty('project');
            expect(res.body).toHaveProperty('status', 'Success');
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
