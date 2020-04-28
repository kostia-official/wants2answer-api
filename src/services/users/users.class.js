const _ = require('lodash');
const { Service } = require('feathers-sequelize');

exports.Users = class Users extends Service {
  me = async (params) => {
    const id = _.get(params, 'user.id');

    return this._get(id);
  };
};
