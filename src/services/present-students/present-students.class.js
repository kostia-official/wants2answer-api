const { Service } = require('feathers-sequelize');
const { BadRequest } = require('@feathersjs/errors');

exports.PresentStudents = class PresentStudents extends Service {
  constructor(config, app) {
    super(config);

    this.app = app;
  }

  unset = async ({ studentId, date = new Date() }) => {
    if (!studentId) throw new BadRequest('You must specify "studentId"');

    const sequelize = this.app.get('sequelizeClient');

    return sequelize.model('present_students').destroy({ where: { studentId, date }, limit: 1 });
  };
};
