'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('CompletedActivities',
      [
        {
          userID: 1,
          activityID: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userID: 1,
          activityID: 2,
          createdAt: new Date(),
          completedAt: new Date(),
          updatedAt: new Date()
        },
        {
          userID: 2,
          activityID: 1,
          completedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('CompletedActivities', null, {})
  }
};
