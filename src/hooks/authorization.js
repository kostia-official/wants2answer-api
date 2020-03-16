const { NotAuthenticated } = require('@feathersjs/errors');
const config = require('config');

module.exports = ctx => {
  console.log('config', config.get('apiToken'));
  console.log('params', ctx.params.token);

  if (config.get('apiToken') !== ctx.params.token) {
    throw new NotAuthenticated('Wrong API token!');
  }

  return ctx;
};
