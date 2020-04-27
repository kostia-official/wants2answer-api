const app = require('../../src/app');
const _ = require('lodash');
const faker = require('faker');
const Promise = require('bluebird');

describe('lessons route', () => {
  const studentsService = app.service('students');
  const presentStudentsService = app.service('present-students');
  const lessonsService = app.service('lessons');

  const studentData = { name: faker.name.findName() };

  describe('when lessons exist', () => {
    const dates = ['2020-01-13', '2020-01-20'];

    let result;
    let createdStudent;

    beforeAll(async () => {
      createdStudent = await studentsService.create(studentData);

      await Promise.map(dates, (date) => {
        return presentStudentsService.create({ studentId: createdStudent.id, date });
      });

      result = await lessonsService.find();
    });

    it('should return expected result', function() {
      const resultDates = _.map(result, 'date');

      expect(resultDates).toEqual(expect.arrayContaining(dates));
    });
  });
});
