var express = require('express');
var router = express.Router();

var User = require('../models').user;
//var _ = require('lodash'); for another way of limiting the attributes

router.param('user_id', function(req, res, next) {
  User.findById(req.params.user_id).then(function(u) {
    req.user = res.locals.user = u;
    next();
  });
});

router.get('/', function(req, res) {
    var page = req.query.page || 1;
    User.findAll({
      attributes: ['id','username', 'email'],
      limit: 5,
      offset: (page - 1) * 5
    }).then(function(users) {
      res.format({
        html: function() {
          res.render('users', { users: users });
        },
        json: function() {
          res.json({ users: users })
        }
      })
    });
});

router.get('/usernameExists', function(req, res) {
  User.doesUsernameExist(req.query.username)
    .then(res.json.bind(res));
});

router.get('/:user_id', function(req, res) {
  res.render('individualUser');
});

router.get('/verify', function(req, res) {
  // something here
});

module.exports = router;
