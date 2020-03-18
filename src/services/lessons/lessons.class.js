exports.Lessons = class Lessons {
  constructor(config, app) {
    this.config = config;
    this.app = app;
  }

  find = async () => {
    const sequelize = this.app.get('sequelizeClient');

    return sequelize.query(
      `
SELECT date
FROM present_students
GROUP BY date
ORDER BY date DESC;
`,
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      }
    );
  };
};
