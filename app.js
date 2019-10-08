var api = require('./api');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Create authentication module
var dotenv = require('dotenv');
var basicAuth = require('express-basic-auth');
var basicAuthCall = basicAuth({
                      authorizer: myAuthorizer,
                      challenge: true,
                      realm: "the site",
                      unauthorizedResponse: function(req) {
                        return req.auth
                            ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
                            : 'No credentials provided'
                          }
                  });
function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.USER_NAME);
    const passwordMatches = basicAuth.safeCompare(password, process.env.USER_PASSW);
 
    return userMatches & passwordMatches;
};
dotenv.config();

// Create app
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get api
app.get('/api', api);

// Run static middleware & load site
app.use(basicAuthCall);
app.use(express.static(__dirname + '/static'));
app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function() {
  console.log('GSX2JSON listening on port ' + port);
});
