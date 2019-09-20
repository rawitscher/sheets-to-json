
var api = require('./api');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// build link to sheet
//var sheetID = '1Rf4dDcr5eRm9f8epLKxeKOHswgMWRXOzU1Idcdg9YlI'
//var sheetNumber = '3'
//var host = 'localhost:5000'
//var fullURL = 'http://'+host+'/api?id='+sheetID+'&sheet='+sheetNumber

// get api
app.get('/api', api);


// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function() {
  console.log('GSX2JSON listening on port ' + port);
  //console.log('View resulting JSON at ' + fullURL)
});
