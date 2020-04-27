const faker = require('faker');
const _ = require('lodash');
const app = require('../../src/app');

const webinarJoinsService = app.service('webinar/joins');
const webinarParticipantsService = app.service('webinar/participants');
const studentsService = app.service('students');

describe('webinar-joins service', () => {
  describe('when a participant does not have attached student', () => {
    const webinarParticipantData = {
      id: faker.random.uuid(),
      name: faker.name.firstName()
    };

    const webinarJoinData = {
      participantId: webinarParticipantData.id,
      webinarTopic: faker.random.uuid()
    };

    beforeAll(async () => {
      await webinarJoinsService.create({ ...webinarJoinData, joinDate: new Date() });

      await webinarParticipantsService.create(webinarParticipantData);

      await webinarJoinsService.create({ ...webinarJoinData, joinDate: faker.date.past(1) });
    });

    it('should find a webinar_joins record for today', async () => {
      const joins = await webinarJoinsService.find({
        query: { joinDate: new Date(), webinarTopic: webinarJoinData.webinarTopic }
      });
      const joinsForCurrentTest = _.filter(joins, { webinarTopic: webinarJoinData.webinarTopic });

      expect(joinsForCurrentTest).toHaveLength(1);

      expect(joinsForCurrentTest[0].participantId).toBe(webinarParticipantData.id);
      expect(joinsForCurrentTest[0].participantName).toBe(webinarParticipantData.name);

      expect(joinsForCurrentTest[0].studentId).toBeNull();
    });
  });

  describe('when a participant has attached student', () => {
    const studentId = faker.random.uuid();
    const webinarTopic = faker.random.uuid();

    const webinarParticipantData = {
      id: faker.random.uuid(),
      name: faker.name.firstName()
    };
    const webinarJoinData = {
      participantId: webinarParticipantData.id,
      webinarTopic
    };

    beforeAll(async () => {
      await studentsService.create({ id: studentId, name: faker.name.firstName() });

      await webinarParticipantsService.create({
        ...webinarParticipantData,
        studentId
      });

      await webinarJoinsService.create({ ...webinarJoinData, joinDate: new Date() });
      await webinarJoinsService.create({ ...webinarJoinData, joinDate: faker.date.past(1) });
    });

    it('should find a webinar_joins record for today', async () => {
      const joins = await webinarJoinsService.find({
        query: { joinDate: new Date(), webinarTopic }
      });
      const joinsForCurrentTest = _.filter(joins, { webinarTopic });

      expect(joinsForCurrentTest).toHaveLength(1);

      expect(joinsForCurrentTest[0].participantId).toBe(webinarParticipantData.id);
      expect(joinsForCurrentTest[0].participantName).toBe(webinarParticipantData.name);

      expect(joinsForCurrentTest[0].studentId).toBe(studentId);
    });
  });
});
