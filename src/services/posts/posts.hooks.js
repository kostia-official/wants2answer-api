const { authenticate } = require('@feathersjs/authentication').hooks;
const _ = require('lodash');

const setUserId = (ctx) => {
  ctx.data.userId = _.get(ctx, 'params.user.id');
  return ctx;
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), setUserId],
    update: [authenticate('jwt'), setUserId],
    patch: [authenticate('jwt'), setUserId],
    remove: [authenticate('jwt'), setUserId]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
