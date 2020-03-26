const students = require('./students/students.service.js');
const scores = require('./scores/scores.service.js');
const presentStudents = require('./present-students/present-students.service.js');
const lessons = require('./lessons/lessons.service');

const webinarParticipants = require('./webinar-participants/webinar-participants.service.js');

module.exports = function(app) {
  app.configure(students);
  app.configure(scores);
  app.configure(presentStudents);
  app.configure(lessons);
  app.configure(webinarParticipants);
};
