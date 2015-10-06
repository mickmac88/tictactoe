var express = require('express');
var app = express.Router();

var user = require('../models').User;

// User logout
app.get('/', function(req, res) {
  res.render('logout');
});

app.post('/', function(req, res) {
  user.find({ where: { username: req.body.username }})
    .then(function(user) {
        if (req.currentUser) {
          req.flash('success', "You successfully logged out!");
          req.session.destroy(function() {
            res.redirect('/login');
          });
        } else {
          req.flash('warning', "You're not logged in!");
          req.session.save(function() {
            res.redirect('/login');
            });
          }
    });
  });

module.exports = app;
