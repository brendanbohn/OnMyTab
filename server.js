var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');


//requires models as the database

//CONFIGURATION

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));

app.use('/sounds', express.static('sounds'));

app.use('/client', express.static('Client'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 600000 }
}));

var db = require('./models/');
var yelp = require('./client/yelp');



// CHECKS COOKIES TO SEE IF USER DONE
app.get('/current-user', function (req, res) {
  res.json({ user: req.session.user });
});

// YELP REQUEST
app.get('/home', function(req, res) {
	yelp.request_yelp({term: 'yelp', location: 'San+Francisco', limit: '1'}, function(err, response, body) {
    var yelpResults = JSON.parse(body).businesses;
    	res.render('home', { yelpResults: yelpResults });
 	});
});

// SIGN UP REQUEST
app.get('/signup', function (req, res) {
	res.render('signup');
});

// USER DATABASE ADD 
app.post('/users', function (req, res) {
	console.log(req.body);
  var user = req.body;
  db.User.createSecure(user.email, user.password, function (err, user) {
    req.session.userId = user._id;
    req.session.user = user;
    res.json({ user: user, msg: 'User added successfully'});
  })
});








// // USER DATABASE RENDER
// app.get('/users', function (req, res) {
//  db.User.find(function (err, User) {
//      res.send(User);
//     });
// });


app.listen(process.env.PORT || 3000);
});
