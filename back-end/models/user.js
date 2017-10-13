'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.CompletedActivity,{
          foreignKey: 'userID'})
      }
    }
  });
  return User;
};
