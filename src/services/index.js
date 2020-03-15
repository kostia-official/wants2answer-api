const students = require('./students/students.service.js');
const scores = require('./scores/scores.service.js');
const presentStudents = require('./present-students/present-students.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(students);
  app.configure(scores);
  app.configure(presentStudents);
};
