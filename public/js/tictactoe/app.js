(function () {

  angular.module('bewd.tictactoe', ['bewd.tictactoe.board', 'ngMessages', 'bewd.tictactoe.registration', 'bewd.tictactoe.user', 'ngRoute'])
    .config(function($routeProvider) {
      // $routeProvider.when('a/b/c', {
      //   templateUrl: 'a/b/c.html'
      //   controller: 'ABCController'
      //   ...
      // });
      // $routeProvider.when('b/c/d', {});
      $routeProvider.when('/game/wacky', {
        templateUrl: '/public/tmpls/board.html',
        controller: 'BoardController',
        controllerAs: 'vm',
        resolve: {
          boardObj: function() {
            return {
              board: [['A', 'B', 'C'], ['D', 'E', 'F'], ['X', 'Y', 'Z']]
            };
          }
        }
      });
      $routeProvider.when('/game/:id', {
        templateUrl: '/public/tmpls/board.html',
        controller: 'BoardController',
        controllerAs: 'vm',
        resolve: {
          boardObj: function($route, boardService) {
            return boardService.getBoard($route.current.params.id);
          }
        }
      });
    });

})();
