const app = require('../../src/app');
const faker = require('faker');
const supertest = require('supertest');

const request = supertest(app);

describe("users service", () => {
  it('got current user properly', async () => {
    const user = {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.random.uuid()
    };
    const { accessToken } = await app.service('users').create(user);

    await request
      .get('/users/me')
      .set('authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toStrictEqual(user.id);
      });
  });
});
