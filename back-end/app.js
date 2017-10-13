var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var app = express();
var Activity = require('./models').Activity
var User = require('./models').User
var CompletedActivity = require('./models').CompletedActivity


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())

app.get('/', (req, res) => {
  res.json({message: 'successful "get" request to back-end root'})
});

app.get('/activities', (req, res) => {
  Activity.findAll().then((results) => {
    res.json({activities:results})
    })
})

app.get('/completedactivities/:id', (req, res) => {
  CompletedActivity.findAll({
    where: {
      userID: req.params.id,
      completedAt: {
        $ne: null
      }
    },
    include: [{
      model: Activity
    }]
  }).then((results) => {
    res.status(201)
    res.json({completedActivities: results})
  }).catch((error) => {
    res.status(400)
    res.json({errors: {message: "Activities not found"}})
  })
})

app.get('/unfinishedactivities/:id', (req, res) => {
  Activity.sequelize.query('SELECT "Activities"."id", "Activities"."name", "Activities"."description", "Activities"."address", "Activities"."longitude", "Activities"."latitude" FROM "Activities" LEFT OUTER JOIN "CompletedActivities" ON "CompletedActivities"."activityID" = "Activities"."id" AND "CompletedActivities"."userID" = :id WHERE "CompletedActivities"."id" IS NULL', {replacements:{id: req.params.id}})
  .then((results) => {
    res.status(201)
    res.json({unfinishedActivities: results[0]})
  }).catch((error) => {
    res.status(400)
    res.json({errors: {message: "Activities not found"}})
  })
})

app.post('/completedActivity/new', (req, res) => {
  CompletedActivity.create({
    userID: req.body.id,
    activityID: req.body.actID,
    completedAt: new Date()
  })
  CompletedActivity.findAll({
    where: {
      userID: req.body.id,
      completedAt: {
        $ne: null
      }
    },
    include: [{
      model: Activity
    }]
  }).then((results) => {
    Activity.sequelize.query('SELECT "Activities"."id", "Activities"."name", "Activities"."description", "Activities"."address",  "Activities"."address","Activities"."longitude", "Activities"."latitude" FROM "Activities" LEFT OUTER JOIN "CompletedActivities" ON "CompletedActivities"."activityID" = "Activities"."id" AND "CompletedActivities"."userID" = :id WHERE "CompletedActivities"."id" IS NULL', {replacements:{id: req.body.id}})
    .then((unfinished) => {
      res.status(201)
      res.json({
        completedActivities: results,
        unfinishedActivities: unfinished[0]
      })
    }).catch((error) => {
      res.status(400)
      res.json({errors: {message: "Activities not found"}})
    })
  })
})

app.post('/activities/new', (req, res) => {
  req.checkBody('name', 'Is required').notEmpty()
  req.checkBody('description', 'Is required').notEmpty()
  req.checkBody('longitude', 'Is required').notEmpty()
  req.checkBody('latitude', 'Is required').notEmpty()
  req.getValidationResult()
    .then((validationErrors) =>{
      if(validationErrors.isEmpty()){
        Activity.create({
          name: req.body.name,
          description: req.body.description,
          longitude: req.body.longitude,
          latitude: req.body.latitude
        })
        Activity.findAll()
        .then((activities) => {
            res.json({activities:activities})
            })
      }else{
        res.status(400)
        res.json({errors: {validations: validationErrors.array()}})
      }
    })
})

app.post('/signup', (req, res) => {
  req.checkBody('name', 'Is required').notEmpty()
  req.checkBody('email', 'Is required').notEmpty()
  req.checkBody('password', 'Is required').notEmpty()
  req.getValidationResult()
    .then((validationErrors) =>{
      if(validationErrors.isEmpty()){
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }).then((user)=>{
          if(user.verifyPassword(req.body.password)){
            CompletedActivity.findAll({
              where: {
                userID: user.id,
                completedAt: {
                  $ne: null
                }
              },
              include: [{
                model: Activity
              }]
            }).then((results) => {
              Activity.sequelize.query('SELECT "Activities"."id", "Activities"."name", "Activities"."description", "Activities"."address", "Activities"."longitude", "Activities"."latitude" FROM "Activities" LEFT OUTER JOIN "CompletedActivities" ON "CompletedActivities"."activityID" = "Activities"."id" AND "CompletedActivities"."userID" = :id WHERE "CompletedActivities"."id" IS NULL', {replacements:{id: user.id}})
              .then((unfinished) => {
                res.status(201)
                res.json({
                  completedActivities: results,
                  unfinishedActivities: unfinished[0],
                  user: user
                })
              }).catch((error) => {
                res.status(400)
                res.json({errors: {message: "Activities not found"}})
              })
            })
          } else {
            res.status(400)
            res.json({errors: {message: "User not found"}})
          }
        }).catch((error) => {
          res.status(400)
          res.json({errors: {message: "User not found"}})
        })
      }else{
        res.status(400)
        res.json({errors: {validations: validationErrors.array()}})
      }
    })
})

app.post('/login', (req, res) => {
  req.checkBody('email', 'Is required').notEmpty()
  req.checkBody('password', 'Is required').notEmpty()
  req.getValidationResult()
    .then((validationErrors) =>{
      if(validationErrors.isEmpty()){
        // find user by email
        User.find({ where: {email: req.body.email} }).then((user) => {
          // check users password
          if(user.verifyPassword(req.body.password)){
            CompletedActivity.findAll({
              where: {
                userID: user.id,
                completedAt: {
                  $ne: null
                }
              },
              include: [{
                model: Activity
              }]
            }).then((results) => {
              Activity.sequelize.query('SELECT "Activities"."id", "Activities"."name", "Activities"."description", "Activities"."address", "Activities"."longitude", "Activities"."latitude" FROM "Activities" LEFT OUTER JOIN "CompletedActivities" ON "CompletedActivities"."activityID" = "Activities"."id" AND "CompletedActivities"."userID" = :id WHERE "CompletedActivities"."id" IS NULL', {replacements:{id: user.id}})
              .then((unfinished) => {
                res.status(201)
                res.json({
                  completedActivities: results,
                  unfinishedActivities: unfinished[0],
                  user: user
                })
              }).catch((error) => {
                res.status(400)
                res.json({errors: {message: "Activities not found"}})
              })
            })
          } else {
            res.status(400)
            res.json({errors: {message: "User not found"}})
          }
        }).catch((error) => {
          res.status(400)
          res.json({errors: {message: "User not found"}})
        })
      }else{
        res.status(400)
        res.json({errors: {validations: validationErrors.array()}})
      }
    })
})

app.post('/user', (req, res) => {
  req.checkBody('email', 'Is required').notEmpty()

  req.getValidationResult()
    .then((validationErrors) =>{
      if(validationErrors.isEmpty()){
        // find user by email
        User.find({ where: {email: req.body.email} }).then((user) => {
            res.status(201)
            res.json({user: user})
        }).catch((error) => {
          res.status(400)
          res.json({errors: {message: "User not found"}})
        })
      }else{
        res.status(400)
        res.json({errors: {validations: validationErrors.array()}})
      }
    })
})

module.exports = app
