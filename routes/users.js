var express = require('express');
var router = express.Router();

var User = require('../models').User;

router.param('user_id', function(req, res, next) {
  User.findById(req.params.user_id).then(function(u) {
    req.user = res.locals.user = u;
    next();
  });
});

router.get('/', function(req, res) {
    User.findAll().then(function(users) {
        res.render('users', { users: users });
    });
});

router.get('/usernameExists', function(req, res) {
  User.doesUsernameExist(req.query.username)
    .then(res.json.bind(res));
});

router.get('/:user_id', function(req, res) {
  res.render('individualUser');
});

module.exports = router;
