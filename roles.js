var ConnectRoles = require('connect-roles');

var roles = new ConnectRoles();

roles.use('access admin page', function(req) {
  // msantos is the admin
  return req.currentUser && req.currentUser.username === 'msantos';
});

module.exports = roles;
