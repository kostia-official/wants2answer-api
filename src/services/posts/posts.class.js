const { Service } = require('feathers-sequelize');
const _ = require('lodash');

exports.Posts = class Posts extends Service {
  constructor(config, app) {
    super(config);

    this.app = app;
  }

  toggleLike = async (data, params) => {
    const sequelize = this.app.get('sequelizeClient');
    const posts = sequelize.model('posts');
    const { id } = params.route;
    const { userId } = data;

    const postBefore = await this._get(id);

    const isLikedBefore = _.includes(postBefore.likes, userId);

    const arrayOperation = isLikedBefore ? 'array_remove' : 'array_append';

    await posts.update(
      { likes: sequelize.fn(arrayOperation, sequelize.col('likes'), data.userId) },
      { where: { id } }
    );

    return this._get(id);
  };
};
