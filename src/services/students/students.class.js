const { Service } = require('feathers-sequelize');
const _ = require('lodash');

exports.Students = class Students extends Service {
  constructor(config, app) {
    super(config);
    this.app = app;
  }

  getStudentsStatistic = ({ query: { date = new Date() } }) => {
    const sequelize = this.app.get('sequelizeClient');

    return sequelize.query(
      `
SELECT
  students.id, students.name, COALESCE(CAST(SUM(scores.score) as int), 0) as score,
  MAX(p.date) as date, COUNT(p.date) > 0 AS "isPresent"
FROM students
LEFT JOIN scores ON students.id = scores."studentId"
LEFT JOIN present_students AS p ON students.id = p."studentId" AND p.date = $date
GROUP BY students.id
ORDER BY score;
  `,
      {
        bind: { date },
        type: sequelize.QueryTypes.SELECT
      }
    );
  };
};
