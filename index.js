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
      output: 'rest',
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
    parseString(result,{
      trim: true,
      normalize: true,
      explicitArray: false
    },
     function (err, json) {
     var summary = {
      sessionID: json.resultset.summary.sessionID,
      errors: parseInt(json.resultset.summary.NumOfErrors),
      likelyProblems: parseInt(json.resultset.summary.NumOfLikelyProblems),
      potentialProblems: parseInt(json.resultset.summary.NumOfPotentialProblems)
     };

     var results = json.resultset.results.result || {};

     callback( {
      summary : summary,
      results: json.resultset.results.result
     });

    });
  });
};


module.exports = achecker;