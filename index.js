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

  messaging_events = request.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = request.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
    }
  }
  response.sendStatus(200);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


