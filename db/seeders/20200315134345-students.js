const uuid = require('uuid');

const tableName = 'students';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      tableName,
      [
        { id: uuid.v4(), name: 'Александр Друзь' },
        { id: uuid.v4(), name: 'Борис Бурда' },
        { id: uuid.v4(), name: 'Джон Реактов' },
        { id: uuid.v4(), name: 'Майкл Стабб' },
        { id: uuid.v4(), name: 'Джек Тестерсон' }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};
