const { Service } = require('feathers-sequelize');

exports.WebinarParticipants = class WebinarParticipants extends Service {
  async create(data, params) {
    console.log('received webhook message', JSON.stringify(data, null, 2));

    return {};
  }
};
