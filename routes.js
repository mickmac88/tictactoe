var express = require('express');
var app = express.Router();

app.use(function(req, res, next) {
  if (req.session.user_id) {
    models.User.findById(req.session.user_id).then(function(user) {
      req.currentUser = res.locals.currentUser = user;
      next();
    })
  } else {
    next();
  }
});

app.get('/', function(req, res) {
  //res.send('Hello world!');
  res.render('index');
});

app.use('/game', require('./routes/game'));

var models = require('./models');

app.use('/games', require('./routes/games'));

app.use('/login', require('./routes/login'));

app.use('/register', require('./routes/register'));

app.get('/users', function(req, res) {
    models.User.findAll().then(function(users) {
        res.render('users', { users: users });
    });
});

app.get('/users/:user_id', function(req, res) {
    models.User.findById(req.params.user_id).then(function(user) {
        res.render('individualUser', { user: user });
    });
});

module.exports = app;
