const supertest = require('supertest');
const faker = require('faker');
const config = require('config');
const app = require('../../src/app');

const request = supertest(app);
const zoomConfig = config.get('zoom');
const sequelize = app.get('sequelizeClient');

const toLocalDate = (date) => new Date(date).toLocaleDateString();

const createWebhookEvent = ({
  userId = '234883072',
  topic = zoomConfig.webinarGroup,
  event = 'webinar.participant_joined',
  joinTime = '2020-04-02T17:15:22Z'
}) => ({
  event,
  payload: {
    account_id: '9XCOoSOfQsCCleFHLHX-kQ',
    object: {
      duration: 180,
      start_time: '2020-04-02T16:17:03Z',
      timezone: 'Europe/Kiev',
      topic,
      id: '764637703',
      type: 5,
      uuid: '+vRFotWLQmG99lqDBfhnwA==',
      participant: {
        id: userId,
        user_id: Math.random().toString(),
        user_name: 'Джон',
        join_time: joinTime
      },
      host_id: 'R6NBDkEHTjmW23BG_sKykg'
    }
  }
});

describe('webinar-participants service', () => {
  describe('when a participant is new', () => {
    const userId = faker.random.uuid();
    const webhookEvent = createWebhookEvent({ userId });

    beforeAll(async () => {
      await request
        .post('/webhooks/webinar')
        .set('authorization', zoomConfig.verificationToken)
        .send(webhookEvent)
        .expect(201)
        .expect(({ body }) => {
          expect(body.isParticipantCreated).toBeTruthy();
          expect(body.isJoinCreated).toBeTruthy();
        });
    });

    it('should find a webinar_participants record', async () => {
      const participant = await sequelize.model('webinar_participants').findByPk(userId);

      expect(participant).toBeTruthy();
      expect(participant.name).toBe(webhookEvent.payload.object.participant.user_name);
    });

    it('should find one webinar_join record', async () => {
      const joins = await sequelize
        .model('webinar_joins')
        .findAll({ where: { participantId: userId } });

      expect(joins).toHaveLength(1);

      expect(toLocalDate(joins[0].joinDate)).toBe(
        toLocalDate(webhookEvent.payload.object.participant.join_time)
      );
      expect(joins[0].webinarTopic).toBe(webhookEvent.payload.object.topic);
    });
  });

  describe('when a participant was saved before', () => {
    const userId = faker.random.uuid();

    beforeAll(async () => {
      await request
        .post('/webhooks/webinar')
        .set('authorization', zoomConfig.verificationToken)
        .send(createWebhookEvent({ userId, joinTime: faker.date.past(1) }))
        .expect(201)
        .expect(({ body }) => {
          expect(body.isParticipantCreated).toBeTruthy();
          expect(body.isJoinCreated).toBeTruthy();
        });

      await request
        .post('/webhooks/webinar')
        .set('authorization', zoomConfig.verificationToken)
        .send(createWebhookEvent({ userId, joinTime: new Date() }))
        .expect(201)
        .expect(({ body }) => {
          expect(body.isParticipantCreated).toBeFalsy();
          expect(body.isJoinCreated).toBeTruthy();
        });
    });

    it('should find a webinar_participants record', async () => {
      const participant = await sequelize.model('webinar_participants').findByPk(userId);

      expect(participant).toBeTruthy();
    });

    it('should find 2 webinar_join records', async () => {
      const joins = await sequelize
        .model('webinar_joins')
        .findAll({ where: { participantId: userId } });

      expect(joins).toHaveLength(2);
    });
  });

  describe('when an existing participant has related student record', () => {
    const userId = faker.random.uuid();
    const studentId = faker.random.uuid();
    const studentData = { id: studentId, name: faker.name.firstName() };
    const webhookEvent = createWebhookEvent({ userId });
    const params = { token: zoomConfig.verificationToken };

    beforeAll(async () => {
      const student = await app.service('students').create(studentData);

      // First join
      await app.service('webhooks/webinar').create(webhookEvent, params);

      await app.service('webinar/participants').patch(userId, { studentId: student.id });

      // Second join
      await app.service('webhooks/webinar').create(webhookEvent, params);
    });

    it('should find a webinar_participants record with student id', async () => {
      const participant = await sequelize.model('webinar_participants').findByPk(userId);

      expect(participant).toBeTruthy();
      expect(participant.name).toBe(webhookEvent.payload.object.participant.user_name);
      expect(participant.studentId).toBe(studentId);
    });
  });

  describe('when verificationToken is wrong', () => {
    const userId = faker.random.uuid();
    const webhookEvent = createWebhookEvent({ userId });

    it('should respond with Forbidden error', () => {
      return request
        .post('/webhooks/webinar')
        .send(webhookEvent)
        .expect(403);
    });
  });

  describe('when webinarGroup is wrong', () => {
    const userId = faker.random.uuid();
    const webhookEvent = createWebhookEvent({ userId, topic: faker.random.word() });

    it('should respond with Forbidden error', () => {
      return request
        .post('/webhooks/webinar')
        .set('authorization', zoomConfig.verificationToken)
        .send(webhookEvent)
        .expect(403);
    });
  });

  describe('when event is wrong', () => {
    const userId = faker.random.uuid();
    const webhookEvent = createWebhookEvent({ userId, event: faker.random.word() });

    it('should respond with Forbidden error', () => {
      return request
        .post('/webhooks/webinar')
        .set('authorization', zoomConfig.verificationToken)
        .send(webhookEvent)
        .expect(403);
    });
  });
});
