'use strict';

module.exports = function(sequelize, DataTypes) {
  var Board = sequelize.define('board', {
    board: {
        type: DataTypes.STRING,
        get: function() {
            // Just trust me on this
            // This will split the string into groups of three
            return this.getDataValue('board')
            .match(/.{3}/g)
            .map(function(row) {
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
      }
    },
    {
    classMethods: {
      associate: function(models) {
        Board.belongsTo(models.user, { as: 'XPlayer', foreignKey: 'xPlayerId' });
        Board.belongsTo(models.user, { as: 'OPlayer', foreignKey: 'oPlayerId' });
      }
    },
    instanceMethods: {
      isOpenForJoining: function() {
        return !this.xPlayerId || !this.oPlayerId;
      },
      isPlayer: function(user) {
        return this.xPlayerId == user.id || this.oPlayerId == user.id;
      }
    },
    scopes: {
      stale: function() {
        return {
          where: {
            updatedAt: {
              $lt: new Date((new Date()) - 24 * 60 * 60 * 1000 * 7)
            }
          }
        };
      },
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
