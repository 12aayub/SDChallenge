'use strict';
module.exports = function(sequelize, DataTypes) {
  var completedActivity = sequelize.define('completedActivity', {
    userId: DataTypes.INTEGER,
    activityID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return completedActivity;
};