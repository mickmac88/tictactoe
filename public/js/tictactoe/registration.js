(function() {
  angular.module('bewd.tictactoe.registration', ['ngMessages'])
    .directive('uniqueUsername', function($http, $q) {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          // Unique-username="raynes,jamesBond007"
          // var existingUsernames = attrs.uniqueUsername.split(',');
          ctrl.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
            if (!modelValue) {
              return $q.when();
            }

            return $q(function(resolve, reject) {
              $http({
                url: '/users/usernameExists',
                method: 'GET',
                params: { username: modelValue}
              }).then(function(response) {
                response.data ? resolve() : reject();
              });
            });
            // return  existingUsernames.indexOf(modelValue) === -1;
          };
        }
      };
    });
  })();
