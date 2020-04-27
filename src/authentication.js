const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/signin', authentication);

  app.service('signin').hooks({
    before: {
      create: [
        (ctx) => {
          ctx.data.strategy = 'local';
          return ctx;
        }
      ]
    }
  });

  app.configure(expressOauth());
};
