'use strict';
module.exports = function(sequelize, DataTypes) {
  var Board = sequelize.define('Board', {
    board: {
        type: DataTypes.STRING,
        get: function() {
            // Just trust me on this
            // This will split the string into groups of three
            return this.getDataValue('board').match(/.{3}/g).map(function(row) {
                return row.split('');
            });
        },
        validate: {
            len: 9,
            is: {
              args: /^[XO ]+$/,
              msg: 'Must be a valid tic tac toe board'
            }
        }
      },
    },
        {
    classMethods: {
      associate: function(models) {
        Board.belongsTo(models.User, { as: 'XPlayer', foreignKey: 'xPlayerId' });
        Board.belongsTo(models.User, { as: 'OPlayer', foreignKey: 'oPlayerId' });
      }
    },
    instanceMethods: {
      isOpenForJoining: function() {
        return !this.xPlayerId || !this.oPlayerId;
      }
    },
    scopes: {
      withUsers: function() {
        return {
          include: [
            { association: Board.associations.XPlayer },
            { association: Board.associations.OPlayer }
          ]
        };
      },
      available: {
        where: {
          $or: [
            { xPlayerId: null },
            { oPlayerId: null }
          ]
        }
      },
      forUser: function(u) {
        return {
          where: {
            for: [
              { xPlayerId: u.id},
              { oPlayerId: u.id}
            ]
          }
        }
      }
    }
  });
  return Board;
};
