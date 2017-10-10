var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var app = express();
var Activity = require('./models').Activity
var User = require('./models').User
var completedActivity = require('./models').completedActivity


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())

app.get('/', (req, res) => {
  res.json({message: 'Sup brah'})
});

app.get('/activities', (req, res) => {
  Activity.findAll().then( (activities) => {
    res.json({activities:activities})
    })
})

app.get('/users', (req, res) => {
  User.findAll().then( (users) => {
  res.json({users:users})
  })
})

app.get('/completedactivities', (req, res) => {
  completedActivity.findAll().then( (completedactivities) => {
  res.json({completedactivities:completedactivities})
  })
})

app.post('/activities', (req, res) => {
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
}).then((activity)=>{
  res.status(201)
  res.json({activity: activity})
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

app.post('/users', (req, res) => {
  req.checkBody('firstName', 'Is required').notEmpty()
  req.checkBody('lastName', 'Is required').notEmpty()
  req.checkBody('email', 'Is required').notEmpty()

  req.getValidationResult()
   .then((validationErrors) =>{
     if(validationErrors.isEmpty()){
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
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

module.exports = app
