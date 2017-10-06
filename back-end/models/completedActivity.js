'use strict';
module.exports = function(sequelize, DataTypes) {
  var CompletedActivity = sequelize.define('CompletedActivities', {
    userID: DataTypes.INTEGER,
    activityID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CompletedActivity;
};
