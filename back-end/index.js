const app = require('./app')
const port = process.env.PORT || 3000
app.listen(port, function () {
 console.log('Todo Server listening on port ' + port + '!');
});
