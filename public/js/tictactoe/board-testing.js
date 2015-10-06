angular.module('bewd.tictactoe.board', []);

angular.module('bewd.tictactoe.board')
  .controller('BoardCtrl', function() {

    var emptyCell = '\u00A0\u00A0';
    var vm = this;

    vm.theBoard = [
      [ { value: emptyCell }, { value: emptyCell }, { value: emptyCell } ],
      [ { value: emptyCell }, { value: emptyCell }, { value: emptyCell } ],
      [ { value: emptyCell }, { value: emptyCell }, { value: emptyCell } ]
    ];

    vm.reset = function() {
      _.each(vm.theBoard, function(row) {
        _.each(row, function(cell) {
          cell.value = emptyCell;
        });
      });
      vm.currentPlayer = 'X';
      vm.winner = false;
      vm.draw = false;
    };

    vm.reset();

    vm.isTaken = function(cell) {
      return cell.value !== emptyCell;
    };

    var checkForMatch = function(cell1, cell2, cell3) {
      return cell1.value === cell2.value &&
             cell1.value === cell3.value &&
             cell1.value !== emptyCell;
    };

    var checkForEndOfGame = function() {
      var rowMatch = _.reduce([0, 1, 2], function(memo, row) {
        return memo || checkForMatch(vm.theBoard[row][0], vm.theBoard[row][1],
        vm.theBoard[row][2]);
      }, false);

      var columnMatch = _.reduce([0, 1, 2], function(memo, col) {
        return memo || checkForMatch(vm.theBoard[0][col], vm.theBoard[1][col],
        vm.theBoard[2][col]);
      }, false);

      var diagonalMatch = checkForMatch(vm.theBoard[0][0], vm.theBoard[1][1],
      vm.theBoard[2][2]) ||
                          checkForMatch(vm.theBoard[0][2], vm.theBoard[1][1],
                          vm.theBoard[2][0]);

      vm.winner = rowMatch || columnMatch || diagonalMatch;
      if (!vm.winner) {
        vm.draw = _.reduce(_.flatten(vm.theBoard), function(memo, cell) {
          return memo && cell.value !== emptyCell;
        }, true);
      }

      return vm.winner || vm.draw;
    };

    vm.move = function(cell) {
      cell.value = vm.currentPlayer;
      if (checkForEndOfGame() === false) {
        vm.currentPlayer = vm.currentPlayer === 'X' ? 'O' : 'X';
      }
    };
  })
  .directive('ticTacToeBoard', function() {
    return {
      scope: {
        theBoard: '='
      },
      restrict: 'E',
      templateUrl: '/public/tmpls/board.html',
      controller: 'BoardCtrl',
      controllerAs: 'vm',
      bindToController: true
    };
  });
