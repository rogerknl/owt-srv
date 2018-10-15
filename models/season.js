'use strict';
module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING
    },
  },{});
  Season.associate = function (models) {
    Season.hasMany(models.AccountSeason, {foreignKey: 'season_id', sourceKey: 'id'});
  };
  return Season;
};