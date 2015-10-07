angular.module('bewd.tictactoe.user', []);

angular.module('bewd.tictactoe.user')
  .directive('UserInfo', function() {
    return {
      scope: {
        theUser: '='
      },
      restrict: 'E',
      templateUrl: '/public/tmpls/user.html',
      controller: 'UserInfo',
      controllerAs: 'vm',
      bindToController: true
    };
  });
