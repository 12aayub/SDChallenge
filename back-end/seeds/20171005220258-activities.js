'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Activities',
      [
        {
          name: 'Museum',
          description: 'Visit the Art Museum at Balboa Park.',
          latitude: 32.709536,
          longitude: -117.158021,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'blahblahblah',
          description: 'blahblahbblablabalhba',
          latitude: 32.735073,
          longitude: -117.148412,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Hillcrest Farmer\'s Market',
          description: 'Visit the Hillcrest Farmer\'s Market on Sunday. Take a pictue in front of your favorite vendor.',
          latitude: 32.722752,
          longitude: -117.168310,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Activities', null, {})
    }
  }
