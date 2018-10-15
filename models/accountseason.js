'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccountSeason = sequelize.define('AccountSeason', {
    account_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    posIni: {
      type: DataTypes.INTEGER
    },
    posLast: {
      type: DataTypes.INTEGER
    },
    posMin: {
      type: DataTypes.INTEGER
    },
    posMax: {
      type: DataTypes.INTEGER
    },
  },{});
  AccountSeason.associate = function (models) {
    AccountSeason.hasMany(models.Match, {foreignKey: 'accSea_id', sourceKey: 'id'});

    AccountSeason.belongsTo(models.Account,{foreignKey: 'account_id', targetKey: 'id'});
    AccountSeason.belongsTo(models.Season,{foreignKey: 'season_id', targetKey: 'id'});
  };
  return AccountSeason;
};