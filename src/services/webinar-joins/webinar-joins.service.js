// Initializes the `webinar-joins` service on path `/webinar-joins`
const { WebinarJoins } = require('./webinar-joins.class');
const createModel = require('../../models/webinar-joins.model');
const hooks = require('./webinar-joins.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/webinar/joins', new WebinarJoins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('webinar/joins');

  service.hooks(hooks);
};
