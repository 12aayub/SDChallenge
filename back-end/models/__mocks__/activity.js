'use strict'
var SequelizeMock = require('sequelize-mock')
var dbMock = new SequelizeMock()

module.exports = function(sequelize, DataTypes){
  return dbMock.define('Activity', {
    name: 'Stalk Aaron',
    description: 'Find Aaron, but don\'t get caught',
    longitude: 32.70961,
    latitude: -117.1601878
  })
}
