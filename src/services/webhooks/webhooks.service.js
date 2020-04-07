const { Webhooks } = require('./webhooks.class');

module.exports = function(app) {
  const options = {
    paginate: app.get('paginate')
  };

  const webhooks = new Webhooks(options, app);

  // Methods
  app.use('/webhooks/webinar', { create: webhooks.webinar });
};
