'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Board, { as: 'XPlayer', foreignKey: 'xPlayerId' });
        User.hasMany(models.Board, { as: 'OPlayer', foreignKey: 'oPlayerId' });
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
