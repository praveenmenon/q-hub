'use strict';

module.change_code = 1; // Allow this module to be reloaded by hotswap when changed
var Alexa = require('alexa-app');
var app = new Alexa.app('hub');
var resp = require('./event_info');
var QHubDataHelper = new resp();

// Gets called whenever there is a launch request
app.launch(function(req, res) {
  var prompt = 'Hello. welcome to Q hub';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

// Gets called whenever there is an intent request
app.intent('getTodayEvent', {
},
function(req, res) {
  var prompt = "";
  var event_count;
  let getTodayEventData = new Promise((resolve, reject) => {
    QHubDataHelper.getTodayEvents().then(function(results) {
      console.log("response:", results.body.data);
      console.log("response length:", results.body.data.length);
      switch (results.body.data.length) {
        case 0: event_count = "There are no events scheduled today. ";
        break;
        case 1: event_count = "There is " + results.body.data.length + " event scheduled today. ";
        break;
        default: event_count = "There are " + results.body.data.length + " events scheduled today. ";
      }
      for(var e=0; e < results.body.data.length; e++){
        prompt = prompt + results.body.data[e].title + " event scheduled at " + results.body.data[e].start_time + ". ";
      }
      prompt = event_count + prompt;
      resolve("Success!");
    });
  });
  return getTodayEventData.then((successMessage) => {
    res.say(prompt).reprompt(prompt).shouldEndSession(false).send();
    console.log("Hub response" + successMessage);
  });
});


app.intent('AMAZON.HelpIntent',
  function(req, res) {
    var help = "";
    res.say(help).shouldEndSession(false); // Or let the user stop an action (but remain in the skill)

  });

app.intent('AMAZON.StopIntent',
  function(req, res) {
    var goodbye = "Had a nice time talking to you. Goodbye.";
    res.say(goodbye).shouldEndSession(true); // Or let the user stop an action (but remain in the skill)

  });
module.exports = app;