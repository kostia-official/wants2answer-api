const config = require('config');

console.log(config.get('db'));

module.exports = {
  [process.env.NODE_ENV || 'development']: {
    ...config.get('db')
  }
};
