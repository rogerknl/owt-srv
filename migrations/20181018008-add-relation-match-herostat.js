'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'HeroStats',
      'match_id',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Match',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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