const students = require('./students/students.service.js');
const scores = require('./scores/scores.service.js');
const presentStudents = require('./present-students/present-students.service.js');
const lessons = require('./lessons/lessons.service');
const webinarParticipants = require('./webinar-participants/webinar-participants.service.js');
const webinarJoins = require('./webinar-joins/webinar-joins.service.js');
const webhooks = require('./webhooks/webhooks.service');

module.exports = function(app) {
  app.configure(students);
  app.configure(scores);
  app.configure(presentStudents);
  app.configure(lessons);
  app.configure(webinarParticipants);
  app.configure(webinarJoins);
  app.configure(webhooks);
};
