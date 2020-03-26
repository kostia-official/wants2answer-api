// Initializes the `webinar-participants` service on path `/webinar-participants`
const { WebinarParticipants } = require('./webinar-participants.class');
const createModel = require('../../models/webinar-participants.model');
const hooks = require('./webinar-participants.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/webinar-participants', new WebinarParticipants(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('webinar-participants');

  service.hooks(hooks);
};
