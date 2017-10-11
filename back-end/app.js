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

// app.get('/users', (req, res) => {
//   User.findAll().then( (users) => {
//   res.json({users:users})
//   })
// })

// app.get('/completedactivities', (req, res) => {
//   CompletedActivity.findAll().then( (completedactivities) => {
//   res.json({completedactivities:completedactivities})
//   })
// })

app.post('/completedactivities', (req, res) => {
  CompletedActivity.find({
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
    res.status(201)
    res.json({completedActivities: results})
  }).catch((error) => {
    res.status(400)
    res.json({errors: {message: "Activities not found"}})
  })
})

app.post('/completedActivity/new', (req, res) => {
  CompletedActivity.create({
    userID: req.body.id,
    activityID: req.body.actID
  })
  CompletedActivity.find({
    where: {
      userID: req.body.id
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

// app.get('/completedactivities/:id', (req, res) => {
//   CompletedActivity.findAll({
//     where: {
//       userID: req.params["id"],
//       completedAt: {
//         $ne: null
//       }
//     },
//     include: [{
//       model: Activity
//     }]
//   }).then( (completedactivities) =>{
//     res.json({completedactivities: completedactivities})
//   })
// })

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
        // }).then((activity)=>{
        //   res.status(201)
        //   res.json({activity: activity})
        // })
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
          res.status(201)
          res.json({user: user})
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
              // return user if success
              res.status(201)
              res.json({user: user})
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

// app.post('/users', (req, res) => {
//   req.checkBody('firstName', 'Is required').notEmpty()
//   req.checkBody('lastName', 'Is required').notEmpty()
//   req.checkBody('email', 'Is required').notEmpty()
//
//   req.getValidationResult()
//    .then((validationErrors) =>{
//      if(validationErrors.isEmpty()){
//   User.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email
//   }).then((user)=>{
//     res.status(201)
//     res.json({user: user})
//   })
//   }else{
//         res.status(400)
//         res.json({errors: {validations: validationErrors.array()}})
//       }
//   })
// })

module.exports = app
