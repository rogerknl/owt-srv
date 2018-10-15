'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    bnet: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{});
  Account.associate = function (models) {
    Account.hasMany(models.AccountSeason, {foreignKey: 'account_id', sourceKey: 'id'});

    Account.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'id'});
  };
  return Account;
};