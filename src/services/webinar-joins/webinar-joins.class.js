const { Service } = require('feathers-sequelize');

exports.WebinarJoins = class WebinarJoins extends Service {
  constructor(config, app) {
    super(config);
    this.app = app;
  }

  find = ({ query: { joinDate = new Date() } }) => {
    const sequelize = this.app.get('sequelizeClient');

    return sequelize.query(
      `
SELECT j.*, p."studentId", p.name AS "participantName"
FROM webinar_joins AS j
LEFT JOIN webinar_participants AS p
ON j."participantId" = p.id
GROUP BY j.id, p."studentId", p.name
HAVING j."joinDate" = $joinDate
  `,
      { bind: { joinDate }, type: sequelize.QueryTypes.SELECT }
    );
  };
};
