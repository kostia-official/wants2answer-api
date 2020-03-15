const app = require('../../src/app');
const _ = require('lodash');
const faker = require('faker');

describe('students statistic route', () => {
  const studentsService = app.service('students');
  const scoresService = app.service('scores');
  const presentStudentsService = app.service('present-students');

  const studentData = { name: faker.name.findName() };

  describe('when present with score', () => {
    const scores = [10, 0, 5];
    const date = new Date();

    let result;
    let createdStudent;

    beforeAll(async () => {
      createdStudent = await studentsService.create(studentData);
      await Promise.all(
        _.map(scores, score => scoresService.create({ studentId: createdStudent.id, score }))
      );
      await presentStudentsService.create({ studentId: createdStudent.id, date });

      result = await studentsService.getStudentsStatistic({ query: { date } });
    });

    it('should be proper statistic', function() {
      const studentToTest = _.find(result, { id: createdStudent.id });
      expect(studentToTest.score).toBe(_.sum(scores));
      expect(studentToTest.isPresent).toBeTruthy();
    });
  });

  describe('when absent with score', () => {
    const scores = [10, 0, 5];
    const date = new Date();

    let result;
    let createdStudent;

    beforeAll(async () => {
      createdStudent = await studentsService.create(studentData);
      await Promise.all(
        _.map(scores, score => scoresService.create({ studentId: createdStudent.id, score }))
      );
      await presentStudentsService.create({ studentId: createdStudent.id, date: '1990-01-01' });

      result = await studentsService.getStudentsStatistic({ query: { date } });
    });

    it('should be proper statistic', function() {
      const studentToTest = _.find(result, { id: createdStudent.id });
      expect(studentToTest.score).toBe(_.sum(scores));
      expect(studentToTest.isPresent).toBeFalsy();
    });
  });

  describe('when absent without score', () => {
    const date = new Date();

    let result;
    let createdStudent;

    beforeAll(async () => {
      createdStudent = await studentsService.create(studentData);

      result = await studentsService.getStudentsStatistic({ query: { date } });
    });

    it('should be proper statistic', function() {
      const studentToTest = _.find(result, { id: createdStudent.id });
      expect(studentToTest.score).toBe(0);
      expect(studentToTest.isPresent).toBeFalsy();
    });
  });

  describe('try to hack query', () => {
    let error;
    let createdStudent;

    beforeAll(async () => {
      createdStudent = await studentsService.create(studentData);

      try {
        await studentsService.getStudentsStatistic({ query: { date: `'1990-01-01'; DROP TABLE students;` } });
      } catch (e) {
        error = e;
      }
    });

    it('should be proper statistic', function() {
      expect(error).toBeTruthy();
    });
  });
});
