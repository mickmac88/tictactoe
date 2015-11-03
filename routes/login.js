var express = require('express');
var app = express.Router();

var user = require('../models').user;

// User login
app.get('/', function(req, res) {
  // Is the user already logged in?
  if (req.currentUser) {
    req.flash('info', 'You logged in already as ' + req.currentUser.username + '!');
    req.session.save(function() {
      res.redirect('/games');
    });
  } else {
    res.render('login');
  }
});

app.post('/', function(req, res) {
  user.find({ where: { username: req.body.username }})
    .then(function(user) {
      var warning;
      if (user) {
        if (user.password === req.body.password) {
          req.session.user_id = user.id;
          req.session.save(function() {
            res.format({
              html: function() {
                req.flash('success', "Logged in!");
                res.redirect('/games')
              },
              json: function() {
                res.json({ success: true, message: 'Logged In!' });
              }
            })
          });
        } else { // user.password === req.body.password
          warning = 'Bad password. Try ' + user.password + ' instead.'
          res.format({
            html: function() {
              req.flash('warning', warning);
              req.session.save(function() {
                res.redirect('/login');
              });
            },
            json: function() {
              res.json({ success: false, errors: [warning]});
            }
          })
        }
      } else { // user
        warning = 'Username unknown';
        res.format({
          html: function() {
            req.flash('warning', warning);
            req.session.save(function() {
              res.redirect('/login');
            });
          },
          json: function() {
            res.status(404).json({ success: false, errors: [warning]})
          }
        })
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
