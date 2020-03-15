// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const presentStudents = sequelizeClient.define(
    'present_students',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['studentId', 'date']
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
  presentStudents.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return presentStudents;
};
