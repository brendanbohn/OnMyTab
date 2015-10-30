var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var cookieparser = require('cookie-parser');
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });


//requires models as the database

//CONFIGURATION

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));

app.use('/sounds', express.static('sounds'));

app.use('/client', express.static('client'));

app.use(cookieparser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000000 }
}));

var db = require('./models/');
var yelp = require('./client/yelp.js');


// CHECKS COOKIES TO SEE IF USER DONE
app.get('/current-user', function (req, res) {
  res.json({ user: req.session.user, cookie: req.cookies.userId });
});

// RENDER HOME PAGE
app.get('/', function (req, res) {
	res.render('signup');
});


// ALLOW USER TO UPLOAD PHOTO
// app.post('/api/photo', upload.single('userPhoto'), function (req, res, next) {
//   var file = req.file;
// });

// LOGOUT
app.get('/logout', function (req, res) {
  req.session.user = null;
  res.clearCookie('userId', {path: '/'});
  res.json({ msg: 'User logged out successfully' });
});

// LOGIN
app.post('/login', function (req, res) {
  var user = req.body;
  db.User.authenticate(user.email, user.password, function (err, user) {
    if (err) { console.log('There was an error: ', err) };
    req.session.user = user;
    res.cookie('userId', user._id);
    res.json(user);
  });
});

// USER DATABASE ADD 
app.post('/api/users', function (req, res) {
  var user = req.body;
  db.User.createSecure(user.email, user.password, function (err, user) {
    req.session.user = user;
    res.cookie('userId', user._id);
    res.json({ user: user, msg: 'User logged in successfully'});
  });
});

// USER DATABASE RENDER
app.get('/api/users', function (req, res) {
 db.User.find(function (err, User) {
     res.send(User);
    });
});

// YELP API
app.post('/api/yelp', function (req, res) {
  yelp.request_yelp(req.body, function(err, response, body) {
    var yelpResults = JSON.parse(body).businesses;
    res.json(yelpResults);
  });
});

// YELP API COMMENTS
app.post('/api/yelp/comment', function (req, res) {
  var newComment = req.body;
  db.Comment.create(newComment, function (err, comment) {
    res.json(comment);
  });
});

// RENDER YELP API COMMENTS
app.get('/api/yelp/comment', function (req, res) {
  db.Comment.find(function (err, Comment) {
    res.send(Comment);
  });
});

app.listen(process.env.PORT || 3000);


