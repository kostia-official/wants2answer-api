// Initializes the `students` service on path `/students`
const { Students } = require('./students.class');
const createModel = require('../../models/students.model');
const hooks = require('./students.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  const students = new Students(options, app);

  app.use('/students/statistic', { find: students.getStudentsStatistic });

  app.use('/students', students);

  // Get our initialized service so that we can register hooks
  const service = app.service('students');

  service.hooks(hooks);
};
