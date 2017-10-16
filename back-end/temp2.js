var Activity = require('./models').Activity
var User = require('./models').User
var CompletedActivity = require('./models').CompletedActivity
const sequelize = require('sequelize')
var completed



CompletedActivity.findAll({
  attributes: ['userID', [sequelize.fn('sum', sequelize.col('CompletedActivity.points')), 'totalPoints']],
  group: '"userID", "User"."id", "User"."name"',
  include: [{
    attributes: ['"name"'],
    model: User
  }],
  order: ['totalPoints'],
  limit: 5
  }).then((res) => {
    completed = res
  })

SELECT "CompletedActivity"."userID", sum("CompletedActivity"."points") AS "totalPoints", "User"."name" AS "User.name" FROM "CompletedActivities" AS "CompletedActivity" LEFT OUTER JOIN "Users" AS "User" ON "CompletedActivity"."userID" = "User"."id" GROUP BY "userID", "User"."name" ORDER BY "totalPoints" LIMIT 5
