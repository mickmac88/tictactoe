angular.module('bewd.tictactoe.board', []);

angular.module('bewd.tictactoe.board')
  .controller('BoardCtrl', function($scope) {

    var emptyCell = '?';

    this.theBoard = [
      [ { value: emptyCell }, { value: emptyCell }, { value: emptyCell } ],
      [ { value: emptyCell }, { value: emptyCell }, { value: emptyCell } ],
      [ { value: emptyCell }, { value: emptyCell }, { value: emptyCell } ]
    ];

    this.reset = function() {
      _.each(this.theBoard, function(row) {
        _.each(row, function(cell) {
          cell.value = emptyCell;
        });
      });
      this.currentPlayer = 'X';
      this.winner = false;
      this.cat = false;
    };

    this.reset();

    this.isTaken = function(cell) {
      return cell.value !== emptyCell;
    };

    var checkForMatch = function(cell1, cell2, cell3) {
      return cell1.value === cell2.value &&
             cell1.value === cell3.value &&
             cell1.value !== emptyCell;
    };

    var checkForEndOfGame = function() {
      var rowMatch = _.reduce([0, 1, 2], function(memo, row) {
        return memo || checkForMatch(this.theBoard[row][0], this.theBoard[row][1],
        this.theBoard[row][2]);
      }, false);

      var columnMatch = _.reduce([0, 1, 2], function(memo, col) {
        return memo || checkForMatch(this.theBoard[0][col], this.theBoard[1][col],
        this.theBoard[2][col]);
      }, false);

      var diagonalMatch = checkForMatch(this.theBoard[0][0], this.theBoard[1][1],
      this.theBoard[2][2]) ||
                          checkForMatch(this.theBoard[0][2], this.theBoard[1][1],
                          this.theBoard[2][0]);

      this.winner = rowMatch || columnMatch || diagonalMatch;
      if (!this.winner) {
        this.cat = _.reduce(_.flatten(this.theBoard), function(memo, cell) {
          return memo && cell.value !== emptyCell;
        }, true);
      }

      return this.winner || this.cat;
    };

    this.move = function(cell) {
      cell.value = this.currentPlayer;
      if (checkForEndOfGame() === false) {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
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
