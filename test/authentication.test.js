const app = require('../src/app');
const faker = require('faker');

describe('authentication', () => {
  it('registered the authentication service', () => {
    expect(app.service('signin')).toBeTruthy();
  });

  describe('local strategy', () => {
    const userInfo = {
      email: faker.internet.email(),
      name: 'John',
      password: 'supersecret'
    };

    beforeAll(async () => {
      try {
        await app.service('users').create(userInfo);
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('signin').create(userInfo);

      expect(accessToken).toBeTruthy();
      expect(user).toBeTruthy();
    });
  });
});
