'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('CompletedActivities',
      [
        {
          userID: 2,
          activityID: 1,
          points: 5,
          completedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userID: 3,
          activityID: 1,
          points: 5,
          completedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userID: 4,
          activityID: 1,
          points: 5,
          completedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userID: 5,
          activityID: 1,
          points: 5,
          completedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userID: 6,
          activityID: 1,
          points: 5,
          completedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userID: 7,
          activityID: 1,
          points: 5,
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
