'use strict';
module.exports = function(sequelize, DataTypes) {
  var CompletedActivity = sequelize.define('CompletedActivity', {
    userID: DataTypes.INTEGER,
    activityID: DataTypes.INTEGER,
    completedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        CompletedActivity.belongsTo(models.Activity,{
          foreignKey: 'activityID',
          onDelete: 'CASCADE'
        }),
        CompletedActivity.belongsTo(models.User,{
          foreignKey: 'userID',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return CompletedActivity;
};
