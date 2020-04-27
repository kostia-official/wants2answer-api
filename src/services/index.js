const posts = require('./posts/posts.service.js');
const users = require('./users/users.service.js');

module.exports = function(app) {
  app.configure(posts);
  app.configure(users);
};
