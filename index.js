var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var my_verify = 'verify';
var token = 'EAADryOPZBRZCUBAMBxoZCuwViMbhvfbkI5BjKaBqrMblqR958vGsDeugmKK813ENDibK5iVf7pHihuNZB7WU68Q0ah7EZCnVfapr0yrf2eqJvFsRQWkXJel4BK6aKDuVhogA4LNMvZBG7948T3EW2L7M66CKO8Tfxh4aO4C3G6DQZDZD'

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

app.post('/webhook', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
    }
  }
  sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
});

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


