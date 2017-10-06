'use strict'
var SequelizeMock = require('sequelize-mock')
var dbMock = new SequelizeMock()

module.exports = function(sequelize, DataTypes){
  return dbMock.define('User', {
    firstName: 'Kathy',
    lastName: 'OhYeah',
    email: 'cornnutfan3200@kraft.com'
  })
}
