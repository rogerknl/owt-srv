'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'AccountSeason',
      'account_id',
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Account',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    ).then( () => {
      return queryInterface.addColumn(
        'AccountSeason',
        'season_id',
        {
          type: Sequelize.INTEGER,
          references:{
            model: 'Season',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'AccountSeason',
      'account_id'
    ).then( () => {
      return queryInterface.removeColumn(
        'AccountSeason',
        'season_id'
      );
    });
  }
};