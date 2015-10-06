'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      doesUsernameExist: function(username) {
        return sequelize.query("SELECT 1 from 'users' where username = ?",
                            { replacements: [ username ], type: sequelize.QueryTypes.SELECT })
          .spread(function(userExists) {
            return !userExists;
        });
      }
    }
  });
  return User;
};
