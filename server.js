var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 }
}));

//requires models as the database

//CONFIGURATION

//sets ejs as the view engine
app.set('view engine', 'ejs');
//connection to js and css files inside of public
app.use('/static', express.static('public'));
app.use('/client', express.static('Client'));
app.use('/audio', express.static('audio'));
//body parser config to accept our data types
app.use(bodyParser.urlencoded({ extended: true }));

var db = require('./models/');
var yelp = require('./client/yelp');

app.get('/home', function(req, res) {
	yelp.request_yelp({term: 'bar', cll: '37.7605888,-122.428361', limit: '1'}, function(err, response, body) {
    	res.render('home', { yelpResults: body });
 	});
});

app.get('/signup', function (req, res) {
	res.render('signup');
});

app.get('/api/user', function (req, res) {
	db.User.find(function (err, User) {
    	res.send(User);
    });
});

app.post('/api/user', function (req, res) {
	var newUser = req.body;
	db.User.create(newUser);
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});
