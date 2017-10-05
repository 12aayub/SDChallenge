'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Activity;
};
