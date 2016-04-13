var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var my_verify = 'verify';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
	response.send(cool());
});

app.get('/webhook', function (request, response) {
  if (request.query['hub.verify_token'] === my_verify) {
    response.send(request.query['hub.challenge']);
  } else {
    response.send('Error, wrong validation token');    
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


