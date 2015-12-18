'use strict';

var rest        = require('restler');
var validUrl    = require('valid-url');
var parseString = require('xml2js').parseString;

var achecker = function(options, callback) {

  if (!options.uri) {
    return callback(new Error('Missing required param: uri'), null);
  }

  if (options.uri && !validUrl.isWebUri(options.uri)) {
    return callback(new Error('Invalid url'), null);
  }

  if (!options.key) {
    return callback(new Error('Web Service ID is required'), null);
  }


  var params = {
    query: {
      uri: options.uri,
      id: options.key,
      output: options.output || 'html',
      guide: options.guide || 'WCAG2-AA',
      offset: options.offset || 0
    },
    headers: {
      'Content-Type': 'application/json',
      'Host': 'achecker.ca',
      'X-Target-URI': 'http://achecker.ca/'
    }
  };

  rest.get('http://achecker.ca/checkacc.php', params)
  .on('401', function(){
      callback('Empty URI', null);
  })
  .on('402', function(){
      callback('Invalid URI', null);
  })
  .on('403', function(){
      callback('Empty Web Service ID', null);
  })
  .on('404', function(){
      callback('Invalid Web Service ID', null);
  })
  .on('405', function(){
      callback('No sequence id is given', null);
  })
  .on('complete', function(result) {
    parseString(result, function (err, json) {
     var summary = {
      sessionID: json.resultset.summary[0].sessionID[0],
      errors: json.resultset.summary[0].NumOfErrors[0],
      likelyProblems: json.resultset.summary[0].NumOfLikelyProblems[0],
      potentialProblems: json.resultset.summary[0].NumOfPotentialProblems[0]
     };
     var results = json.resultset.results[0].result;

     callback( {
      summary : summary,
      results: results
     });

    });
  });
};


module.exports = achecker;