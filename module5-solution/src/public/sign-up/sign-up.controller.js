(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UsersService', 'MenuService'];
  function SignUpController(UsersService, MenuService) {
    var $ctrl = this;
    $ctrl.registrationSuccess = false;
    $ctrl.favoriteDishFound = false;
    
    $ctrl.signUp = function(event) {
      console.log("Sign up started... ");
      event.preventDefault();
      var user = {
            firstName: $ctrl.firstName,
            lastName: $ctrl.lastName,
            email: $ctrl.email,
            phone: $ctrl.phone,
            favoriteDish: $ctrl.favoriteDish
      };

      MenuService.getMenuItem($ctrl.favoriteDish)
        .then(function(data) {
          user.favoriteMenuItem = data;

          UsersService.setUser(user);
          $ctrl.favoriteDishFound = true;
          $ctrl.registrationSuccess = true;
        }, function(err) {
          UsersService.setUser(user);
          $ctrl.favoriteDishFound = false;
          $ctrl.registrationSuccess = true;
        });
    };
  }
})();
