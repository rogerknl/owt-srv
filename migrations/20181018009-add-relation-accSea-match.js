'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Match',
      'accSea_id',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'AccountSeason',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Match',
      'accSea_id'
    );
  }
};