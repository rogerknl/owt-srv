'use strict';
module.exports = (sequelize, DataTypes) => {
  const HeroStats = sequelize.define('HeroStats', {
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    hero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    elim: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    aObj: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tobj: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dmg: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    healing: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deaths: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sFirst: {
      type: DataTypes.INTEGER
    },
    sSecond: {
      type: DataTypes.INTEGER
    },
    sThird: {
      type: DataTypes.INTEGER
    },
    sForth: {
      type: DataTypes.INTEGER
    },
    sFifth: {
      type: DataTypes.INTEGER
    },
  },{});
  HeroStats.associate = function (models) {
    HeroStats.belongsTo(models.Match, {foreignKey: 'match_id', targetKey: 'id'});
  };
  return HeroStats;
};