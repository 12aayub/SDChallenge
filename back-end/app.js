var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: 'Sup brah'})
});

module.exports = app
