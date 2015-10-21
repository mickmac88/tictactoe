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
        User.hasMany(models.board, { as: 'XPlayer', foreignKey: 'xPlayerId' });
        User.hasMany(models.board, { as: 'OPlayer', foreignKey: 'oPlayerId' });
      },
      doesUsernameExist: function(username) {
        return sequelize.query("SELECT 1 from 'users' where username = ?",
                            { replacements: [ username ], type: sequelize.QueryTypes.SELECT })
          .spread(function(userExists) {
            return !userExists;
        });
      }
    },
    instanceMethods: {
      getBoards: function() {
        return sequelize.Promise.all([
          (this.XPlayer || this.getXPlayer()),
          (this.OPlayer || this.getOPlayer())
        ]).then(function(boards) {
          return boards.reduce(function(a, b) { return a.concat(b); }, []);
        })
      }
    },
    scopes: {
      knownValues: {
        where: {
          id: 1
        }
      },
      withBoards: function() {
        return {
          include: [
            { association: User.associations.XPlayer },
            { association: User.associations.OPlayer }
          ]
        }
      }
    }
  });
  return User;
};
