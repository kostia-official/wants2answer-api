// Initializes the `present_students` service on path `/present-students`
const { PresentStudents } = require('./present-students.class');
const createModel = require('../../models/present-students.model');
const hooks = require('./present-students.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/present-students', new PresentStudents(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('present-students');

  service.hooks(hooks);
};
