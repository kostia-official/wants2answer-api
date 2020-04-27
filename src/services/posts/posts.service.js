// Initializes the `posts` service on path `/posts`
const { Posts } = require('./posts.class');
const createModel = require('../../models/posts.model');
const hooks = require('./posts.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  const posts = new Posts(options, app);

  app.use('/posts', posts);

  app.use('/posts/:id/like/toggle', { create: posts.toggleLike });

  app.service('posts').hooks(hooks);
  app.service('/posts/:id/like/toggle').hooks(hooks);
};
