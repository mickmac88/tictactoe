angular.module('bewd.tictactoe.user', []);

angular.module('bewd.tictactoe.user')
  .controller('UserInfo', function() {
    this.theUser = {};
  })
  .directive('showUserInfo', function() {
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
