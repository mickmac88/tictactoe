var express = require('express');
var app = express.Router();

var user = require('../models').User;

// User login
app.get('/', function(req, res) {
  if (req.currentUser) {
    req.flash('info', "You logged in already!");
    req.session.save(function() {
      res.redirect('/games');
    });
  } else {
    res.render('login');
  }
});

app.post('/', function(req, res) {
  // Is the user already logged in?
  user.find({ where: { username: req.body.username }})
    .then(function(user) {
        if (user) {
          if (user.password === req.body.password) {
            req.session.user_id = user.id;
            req.flash('success', "Logged in!");
            req.session.save(function() {
              res.redirect('/games');
            });
          } else {
            req.flash('warning', 'Bad password. Try ' + user.password + ' instead.');
            res.redirect('/login');
          }
        } else {
          req.flash('warning', "Username Unknown");
          res.redirect('/login');
        }
      });
  });

//           user.find({ where: { password: req.body.password }})
//             .then(function(User) {
//               if (user) {
//                 models.User.findById(req.session.user_id)
//                   .then(function() {
//                     res.redirect('/games');
//                   });
//                 } else {
//                     req.flash('warning', "Username or Password is Incorrect");
//                     req.session.save(function() {
//                       res.redirect('/login');
//                     });
//                   };
//               });
//         };
//     });
// });

module.exports = app;
