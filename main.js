'use strict';

const Alexa        = require('alexa-sdk');
const HNHelper     = require('HNHelper.js');
const ALEXA_APP_ID = 'amzn1.ask.skill.ff384759-c4a2-411f-9ad7-365385e5f64f';

var intentHandlers = {
  'TopStoryIntent': function() {
      var topStoryTitle = HNHelper.getTopStoryTitle();
      this.emit(':tell', topStoryTitle);
  }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.appId = ALEXA_APP_ID;
    alexa.registerHandlers(intentHandlers);
    alexa.execute();
};
