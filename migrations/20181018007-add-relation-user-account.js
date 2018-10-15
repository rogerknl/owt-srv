'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Account',
      'user_id',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'User',
          key: 'id'
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Account',
      'user_id'
    );
  }
};