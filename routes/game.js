var express = require('express');
var app = express.Router();

app.get('/', function(req, res) {
    var playerName = req.session.playerName;
    res.render('game', { username: playerName });
});

app.post('/', function(req, res) {
  req.session.playerName = req.body.username;
  req.session.save(function() {
    res.redirect('/game');
  });
});

module.exports = app;
