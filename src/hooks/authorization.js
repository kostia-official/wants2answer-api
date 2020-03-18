const { NotAuthenticated } = require('@feathersjs/errors');
const config = require('config');

module.exports = (ctx) => {
  if (process.env.NODE_ENV === 'test') return;

  if (config.get('apiToken') !== ctx.params.token) {
    throw new NotAuthenticated('Wrong API token!');
  }

  return ctx;
};
