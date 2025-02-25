const app = require('../../app');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);

describe(
    'CREATE methods for the List model', () => {

        it('should create a new list when given valid data', async () => {
            const res = await requestWithSupertest.post('/api/lists')
                .send({title: 'some test title'});
            expect(res.status).toEqual(200);
            expect(res.body.title).toEqual('some test title');
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('updatedAt');
            //cleanup
            await requestWithSupertest.delete('/api/lists/'+res.body.id);
    });
}
);