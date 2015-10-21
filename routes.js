var express = require('express');
var app = express.Router();

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    return !!req.currentUser;
  };
  if (req.session.user_id) {
    models.user.findById(req.session.user_id).then(function(user) {
      console.log("User logged in as " + user.username);
      req.currentUser = res.locals.currentUser = user;
      next();
    })
  } else {
    next();
  }
});

var roles = require('./roles');
app.use(roles.middleware({ userProperty: 'currentUser' }));

app.get('/', function(req, res) {
  //res.send('Hello world!');
  res.render('index');
});

app.use('/game', require('./routes/game'));

var models = require('./models');

app.use('/games', require('./routes/games'));

app.use('/login', require('./routes/login'));

app.use('/register', require('./routes/register'));

app.use('/users', require('./routes/users'));

app.use('/logout', require('./routes/logout'));

app.use('/admin', require('./routes/admin'));

module.exports = app;
