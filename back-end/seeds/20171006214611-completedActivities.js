'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('CompletedActivities',
      [
        {
          userID: 4,
          activityID: 1,
          completedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userID: 4,
          activityID: 2,
          completedAt: new Date(),
          createdAt: new Date(),
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
