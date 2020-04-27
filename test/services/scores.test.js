const app = require('../../src/app');
const _ = require('lodash');
const faker = require('faker');

describe('scores service', () => {
  const studentsService = app.service('students');
  const scoresService = app.service('scores');
  const studentData = { name: faker.name.findName() };

  describe('create', () => {
    let result;

    beforeAll(async () => {
      const student = await studentsService.create(studentData);
      result = await scoresService.create({ studentId: student.id, score: 15 });
    });

    it('should create a student with proper columns', function() {
      expect(_.isNumber(result.score)).toBeTruthy();
    });
  });
});
