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

app.get('/completedactivities/', (req, res) => {
  CompletedActivity.findAll().then( (completedactivities) => {
  res.json({completedactivities:completedactivities})
  })
})

app.get('/completedactivities/:id', (req, res) => {
  CompletedActivity.findAll({
    where: {
      userID: req.params["id"],
      completedAt: {
        $ne: null
      }
    },
    include: [{
      model: Activity
    }]
  }).then( (completedactivities) =>{
    res.json({completedactivities: completedactivities})
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
