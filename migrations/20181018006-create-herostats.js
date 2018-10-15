'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HeroStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      hero: {
        type: Sequelize.STRING,
        allowNull: false
      },
      elim: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      aObj: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tobj: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dmg: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      healing: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deaths: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sFirst: {
        type: Sequelize.INTEGER
      },
      sSecond: {
        type: Sequelize.INTEGER
      },
      sThird: {
        type: Sequelize.INTEGER
      },
      sForth: {
        type: Sequelize.INTEGER
      },
      sFifth: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('HeroStats');
  }
};