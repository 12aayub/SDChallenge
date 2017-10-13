'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',
      [
        {
          firstName: 'Aaron',
          lastName: 'Ayub',
          email: 'aaronrocks@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Darren',
          lastName: 'LJ',
          email: 'darrenrocks@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Kathy',
          lastName: 'OhYeah',
          email: 'kathyrocks@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Users', null, {})
    }
  }
