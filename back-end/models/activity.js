'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        Activity.hasMany(models.CompletedActivity,{
          foreignKey: 'activityID',
          as: 'completedactivities'
        })
      }
    }
  });
  return Activity;
};
