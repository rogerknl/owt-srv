'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Accounts',
      'user_id',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Accounts',
      'user_id'
    );
  }
};