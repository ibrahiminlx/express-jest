const app = require('../server')
const request = require('supertest')
let userid

describe('user test suite',()=>{
    it('POST', async () => {
        const username = 'test'
        const password = 'test'
        const response = await request(app)
            .post('/user')
            .send({ username,password });

        expect(response.status).toBe(200);
        userid=response.body.data.id
        expect(response.body.data.username).toBe(username);
    });
    it('PUT', async () => {
        const username = 'test'
        const password = 'test2'
        const response = await request(app)
            .put('/user')
            .send({ username,password });

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toBe(1)
    });
    it('user GET', async () => {
        const username='test'
        const response = await request(app)
            .get('/user')
            .send({ username });

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe(username);
    });
    test('DELETE', async () => {
        const username='test'
        const response = await request(app)
            .delete('/user')
            .send({ username });
        expect(response.status).toBe(200);
        expect(response.body.data).toBe(1)
    });
})


