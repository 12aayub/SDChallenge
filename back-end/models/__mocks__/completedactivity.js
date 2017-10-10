'use strict'
var SequelizeMock = require('sequelize-mock')
var dbMock = new SequelizeMock()

module.exports = function(sequelize, DataTypes){
  return dbMock.define('CompletedActivity', {
    userID: 1,
    activityID: 1,
    completedAt: new Date()
  })
}
