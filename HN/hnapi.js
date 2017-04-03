'use strict';

const DB = require('./db.js');

var api = {

  stories: function(base, limit, fn){

    var stories = DB.child(base).limitToFirst(limit);
    stories.once('value', function(snapshot){
      // Grab all items from the IDs
      var items = snapshot.val().slice(0, limit);
      var itemFetches = items.map(function(itemID){
        return new Promise(function(resolve, reject){
          var item = DB.child('item/' + itemID);
          item.once('value', function(snap){
            resolve(snap.val());
          }, function(err){
            reject(err);
          });
        });
      });

      // Throw them all into an array
      Promise.all(itemFetches).then(function(res){
        var apiRes = res.map(function(item){
        
          var output = {
            id: item.id,
            title: item.title,
            points: item.score,
            user: item.by,
            time: item.time, // Unix timestamp
          };

          return output;
        });
        
        fn(null, apiRes);
      }).catch(function(err){
        fn(err, null);
      });
    });
  },

  topstories: function(limit, fn) {
  	api.stories('topstories', limit, fn);
  },

  topstory: function(fn) {
  	api.topstories(1, fn);
  }
};

module.exports = api;