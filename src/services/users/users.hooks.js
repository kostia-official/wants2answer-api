const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [protect('password')],
    get: [protect('password')],
    create: [
      async (ctx) => {
        const { email, password } = ctx.arguments[0];
        ctx.result = await ctx.app.service('signin').create({ email, password });

        return ctx;
      }
    ],
    update: [protect('password')],
    patch: [protect('password')],
    remove: [protect('password')]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
