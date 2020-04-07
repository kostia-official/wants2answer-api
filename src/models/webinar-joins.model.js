const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const webinarParticipants = sequelizeClient.define(
    'webinar_joins',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      joinDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      participantId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      webinarTopic: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['participantId', 'joinDate']
        }
      ],
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  webinarParticipants.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return webinarParticipants;
};
