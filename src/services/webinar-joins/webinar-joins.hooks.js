const auth = require('../../hooks/authorization');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [auth],
    update: [auth],
    patch: [auth],
    remove: [auth]
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
