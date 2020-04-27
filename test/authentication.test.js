const app = require('../src/app');
const faker = require('faker');
const supertest = require('supertest');

const request = supertest(app);

describe('authentication', () => {
  it('registered the authentication service', () => {
    expect(app.service('signin')).toBeTruthy();
  });

  describe('sign in', () => {
    const userInfo = {
      email: faker.internet.email(),
      name: 'John',
      password: 'supersecret'
    };

    beforeAll(async () => {
      await app.service('users').create(userInfo);
    });

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('signin').create(userInfo);

      expect(accessToken).toBeTruthy();
      expect(user).toBeTruthy();
    });
  });

  describe('sign up', () => {
    const userInfo = {
      email: faker.internet.email(),
      name: 'John',
      password: 'supersecret'
    };

    it('authenticates user and creates accessToken', async () => {
      await request
        .post('/users')
        .send(userInfo)
        .expect(201)
        .expect(({ body }) => {
          expect(body.accessToken).toBeTruthy();
          expect(body.user).toBeTruthy();
        });
    });
  });
});
