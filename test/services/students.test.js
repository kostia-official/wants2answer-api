const app = require('../../src/app');
const _ = require('lodash');

describe('students service', () => {
  const students = app.service('students');
  const studentData = { name: 'John Testerson' };

  describe('create', () => {
    let result;

    beforeAll(async () => {
      result = await students.create(studentData);
    });

    it('should create a student with proper columns', function() {
      expect(_.isString(result.id)).toBeTruthy();
      expect(result.name).toEqual(studentData.name);
    });
  });

  describe('find', () => {
    let result;

    beforeAll(async () => {
      const student = await students.create(studentData);
      result = await students.find({ query: { id: student.id } });
    });

    it('should find 1 student', function() {
      expect(result).toHaveLength(1);
      expect(result[0].name).toEqual(studentData.name);
    });
  });
});
