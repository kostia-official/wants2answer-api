// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  const users = new Users(options, app);

  app.use('/users/me', { find: users.me });
  app.use('/users', users);

  app.service('users/me').hooks(hooks);
  app.service('users').hooks(hooks);
};
