(function () {

  angular.module('bewd.tictactoe', ['bewd.tictactoe.board', 'ngMessages', 'bewd.tictactoe.registration', 'bewd.tictactoe.user', 'ngRoute'])
    .config(function($routeProvider) {
      // $routeProvider.when('a/b/c', {
      //   templateUrl: 'a/b/c.html'
      //   controller: 'ABCController'
      //   ...
      // });
      // $routeProvider.when('b/c/d', {});
      $routeProvider.when('/game/:id', {
        templateUrl: '/public/tmpls/board.html',
        controller: 'BoardController',
        controllerAs: 'vm'
      });
    });

})();
