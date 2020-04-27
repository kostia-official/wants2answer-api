const app = require('../../src/app');
const faker = require('faker');
const supertest = require('supertest');

const request = supertest(app);

describe("'posts' service", () => {
  it('created a proper new post', async () => {
    const user = {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.random.uuid()
    };
    const { accessToken } = await app.service('users').create(user);

    await request
      .post('/posts')
      .set('authorization', `Bearer ${accessToken}`)
      .send({ imageUrl: 'http://123' })
      .expect(201)
      .expect(({ body }) => {
        expect(body.likes).toStrictEqual([]);
        expect(body.userId).toStrictEqual(user.id);
      });
  });

  it('toggled like properly', async () => {
    const user = {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.random.uuid()
    };
    const post = {
      id: faker.random.uuid(),
      imageUrl: faker.image.imageUrl()
    };
    const { accessToken } = await app.service('users').create(user);

    await request
      .post('/posts')
      .send(post)
      .set('authorization', `Bearer ${accessToken}`)
      .expect(201);

    await request
      .post(`/posts/${post.id}/like/toggle`)
      .set('authorization', `Bearer ${accessToken}`)
      .expect(201)
      .expect(({ body }) => {
        expect(body.likes).toStrictEqual([user.id]);
      });

    await request
      .post(`/posts/${post.id}/like/toggle`)
      .set('authorization', `Bearer ${accessToken}`)
      .expect(201)
      .expect(({ body }) => {
        expect(body.likes).toStrictEqual([]);
      });
  });
});
