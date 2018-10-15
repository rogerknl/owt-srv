'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'HeroStats',
      'match_id',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Matches',
          key: 'id'
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'HeroStats',
      'match_id'
    );
  }
};