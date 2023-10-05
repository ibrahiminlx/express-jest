const app = require('../server')
const request = require('supertest')
const {NO_USER, NO_PASSWORD, PASSWORD_NO_RULE, USER_CONTROL_ERROR, USER_CONTROL_NULL_ERROR} = require("../errorsMessage/userErrorMessages");
const User=require('../models/user')
const {userGetServices, userControllerServices, createUserServices, putUserServices, deleteUserServices}=require('../services/userServices')
const db = require('../db/helper')
let userid
describe('user control test suite',()=>{
    describe('user Post suite',()=>{
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
    })
    describe('user put suite',()=>{
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
    })
    describe('user get suite',()=>{
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
    })
    describe('user delete suite',()=>{
        it('DELETE no username', async () => {
            const response = await request(app)
                .get('/user')
                .send({  });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe(NO_USER);
        });
        it('DELETE no user', async () => {
            const username='test2'
            const response = await request(app)
                .get('/user')
                .send({ username });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe(USER_CONTROL_NULL_ERROR);
        });

        test('DELETE success', async () => {
            const username='test'
            const response = await request(app)
                .delete('/user')
                .send({ username });
            expect(response.status).toBe(200);
            expect(response.body.data).toBe(1)
        });
    })
})
const mockErrorFunction = jest.fn(() => {
    throw new Error('Test hatası');
});
describe('user services test suite',()=>{
    it('userGet function services test', async () => {
        const req = { body: { username: 'test' } };
        User.findOne = mockErrorFunction;
        try {
            await userGetServices(req);
        } catch (e) {
            expect(e.message).toBe('Test hatası');
        }
    });
    it('usercontrol function services test', async () => {
        const req = { body: { username: 'test' } };
        User.findOne = mockErrorFunction;
        try {
            await userControllerServices(req);
        } catch (e) {
            expect(e.message).toBe('Test hatası');
        }
    });
    it('createuser function services test', async () => {
        const req = { body: { username: 'test',password:'test' } };
        User.create = mockErrorFunction;
        try {
            await createUserServices(req);
        } catch (e) {
            expect(e.message).toBe('Test hatası');
        }
    });
    it('putUser function services test', async () => {
        const req = { body: { username: 'test',password:'test' } };
        User.update = mockErrorFunction;
        try {
            await putUserServices(req);
        } catch (e) {
            expect(e.message).toBe('Test hatası');
        }
    });
    it('delete function services test', async () => {
        const req = { body: { username: 'test' } };
        User.destroy = mockErrorFunction;
        try {
            await deleteUserServices(req);
        } catch (e) {
            expect(e.message).toBe('Test hatası');
        }
    });
    it('User.update ve transaction işlemi test', async () => {
        const req = { body: { username: 'test' } };
        const fakeUserUpdateResult = {  };

        User.update = jest.fn().mockResolvedValue(fakeUserUpdateResult);

        const result = await putUserServices(req);
        expect(result).toEqual(fakeUserUpdateResult);
    });


})
describe('helper test suite',()=>{
    it('connect catch test', async () => {
        const mockError = new Error('Test hatası');

        db.sequelize.authenticate = jest.fn().mockRejectedValue(mockError);

        try {
            await db.connect();
        } catch (error) {
            expect(error).toBe(mockError);
        }
    });
    test('db.createTable işlemi başarılı olmalı ve tablo mevcut olmalı', async () => {
        await db.createTable();

        // Tablonun veritabanında mevcut olduğunu kontrol etmek için bir sorgu yapın
        const sequelize = db.sequelize;
        const queryInterface = sequelize.getQueryInterface();
        const tableExists = await queryInterface.showAllTables();

        const userTableExists = tableExists.includes('users');
        expect(userTableExists).toBe(true);
    });
})


