const Sequelize = require('sequelize');

module.exports = function(app) {
  const config = app.get('db');
  const sequelize = new Sequelize(config.url, {
    dialect: config.dialect,
    logging: false,
    define: {
      freezeTableName: true
    },
    native: process.env.NODE_ENV === 'production'
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function(...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync({ force: process.env.DB_RECREATE === 'true' }));

    return result;
  };
};
