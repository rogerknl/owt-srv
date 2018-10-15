'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    accSea_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    victory: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    vod: {
      type: DataTypes.STRING
    },
  },{});
  Match.associate = function (models) {
    Match.hasMany(models.HeroStats, {foreignKey: 'match_id', sourceKey: 'id'});

    Match.belongsTo(models.AccountSeason, {foreignKey: 'accSea_id', targetKey: 'id'});
  };
  return Match;
};