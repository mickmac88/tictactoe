'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Boards', 'xPlayerId', Sequelize.INTEGER);
    queryInterface.addColumn('Boards', 'oPlayerId', Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Boards', 'xPlayerId');
    queryInterface.removeColumn('Boards', 'oPlayerId');
  }
};
