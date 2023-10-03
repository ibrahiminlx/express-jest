const app = require('../server')
const request = require('supertest')
const {NO_USER, NO_PASSWORD, PASSWORD_NO_RULE, USER_CONTROL_ERROR, USER_CONTROL_NULL_ERROR} = require("../errorsMessage/userErrorMessages");
let userid

describe('user test suite',()=>{
    it('POST', async () => {
        const username = 'test'
        const password = 'Test123+'
        const response = await request(app)
            .post('/user')
            .send({ username,password });

        expect(response.status).toBe(200);
        userid=response.body.data.id
        expect(response.body.data.username).toBe(username);
    });
    it('POST username error', async () => {
        const password = 'test'
        const response = await request(app)
            .post('/user')
            .send({password });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(NO_USER);
    });
    it('POST password error', async () => {
        const username = 'test1'
        const response = await request(app)
            .post('/user')
            .send({username });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(NO_PASSWORD);
    });
    it('POST password control error', async () => {
        const username = 'test1'
        const password = 'test1'
        const response = await request(app)
            .post('/user')
            .send({username,password });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(PASSWORD_NO_RULE);
    });
    it('POST password control error', async () => {
        const username = 'test'
        const password = 'Test123+'
        const response = await request(app)
            .post('/user')
            .send({username,password });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(USER_CONTROL_ERROR);
    });
    it('PUT', async () => {
        const username = 'test'
        const password = 'Test1234+'
        const response = await request(app)
            .put('/user')
            .send({ username,password });

        expect(response.status).toBe(200);
        expect(response.body.data[0]).toBe(1)
    });
    it('PUT username error', async () => {
        const password = 'Test1234+'
        const response = await request(app)
            .put('/user')
            .send({ password });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(NO_USER);
    });
    it('PUT password error', async () => {
        const username = 'test2'
        const response = await request(app)
            .put('/user')
            .send({ username });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(NO_PASSWORD);
    });
    it('PUT password control error', async () => {
        const username = 'test'
        const password='Test'
        const response = await request(app)
            .put('/user')
            .send({ username ,password});

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(PASSWORD_NO_RULE);
    });
    it('PUT usercontrol error', async () => {
        const username = 'test2'
        const password='Test123+'
        const response = await request(app)
            .put('/user')
            .send({ username ,password});

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(USER_CONTROL_NULL_ERROR);
    });
    it('user GET', async () => {
        const username='test'
        const response = await request(app)
            .get('/user')
            .send({ username });

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe(username);
    });
    it('user GET no username', async () => {
        const response = await request(app)
            .get('/user')
            .send({ });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(NO_USER);
    });
    it('user GET no user', async () => {
        const username='test2'
        const response = await request(app)
            .get('/user')
            .send({ username });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(USER_CONTROL_NULL_ERROR);
    });
    it('delete no username', async () => {
        const response = await request(app)
            .get('/user')
            .send({  });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(NO_USER);
    });
    it('delete no user', async () => {
        const username='test2'
        const response = await request(app)
            .get('/user')
            .send({ username });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(USER_CONTROL_NULL_ERROR);
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


