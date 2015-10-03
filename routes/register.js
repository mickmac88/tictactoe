var express = require('express');
var app = express.Router();

var user = require('../models').User;

// user registration
app.get('/', function(req, res) {
  res.render('register');
});

app.post('/', function(req, res) {
  // Does the user exist already?
  user.find({ where: { username: req.body.username }})
    .then(function(user) {
        if (user) {
          req.flash('warning', "Username already exists");
          req.session.save(function() {
            res.redirect('/register');
          });
        } else {
          user.create(req.body)
            .then(function(newUser) {
              req.session.user_id = newUser.id;
              req.session.save(function() {
                res.redirect('/games');
              });
          });
        }
    });
});

module.exports = app;
