const expressToFeathers = require('./express-to-feathers');

module.exports = function(app) {
  app.use(expressToFeathers);
};
