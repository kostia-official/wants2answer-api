// Initializes the `present_students` service on path `/present-students`
const { PresentStudents } = require('./present-students.class');
const createModel = require('../../models/present-students.model');
const hooks = require('./present-students.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  const presentStudents = new PresentStudents(options, app);

  // Methods
  app.use('/present-students/unset', { create: presentStudents.unset });
  app.use('/present-students', presentStudents);

  // Hooks
  app.service('present-students/unset').hooks(hooks);
  app.service('present-students').hooks(hooks);
};
