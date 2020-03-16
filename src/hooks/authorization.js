const { NotAuthenticated } = require('@feathersjs/errors');
const config = require('config');

module.exports = ctx => {
  if (config.get('apiToken') !== ctx.params.token) {
    throw new NotAuthenticated('Wrong API token!');
  }

  return ctx;
};
