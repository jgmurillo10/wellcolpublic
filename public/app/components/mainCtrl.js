angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $state, Auth) {

  var vm = this;

  // get info if a person is logged in
  vm.loggedIn = Auth.isLoggedIn();

  // check to see if a user is logged in on every request
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    vm.loggedIn = Auth.isLoggedIn();  
    // console.log;

    console.log(toState);

    console.log(!vm.loggedIn && toState.name !== 'login');
    
    if (toState.name == 'login' && vm.loggedIn) {
      event.preventDefault();
      $state.go('home');
    }
    else if (toState.name !== 'login' && !vm.loggedIn) {
      event.preventDefault();
      $state.go('login');
    }

    // get user information on page load
    Auth.getUser()
      .then(function(data) {
        vm.user = data.data;
      }); 
  }); 

  // function to handle login form
  vm.doLogin = function() {
    vm.processing = true;

    // clear the error
    vm.error = '';

    Auth.login(vm.loginData.username, vm.loginData.password)
      .success(function(data) {
        vm.processing = false;      

        // if a user successfully logs in, redirect to users page
        if (data.success){
          vm.loggedIn = Auth.isLoggedIn();
          $state.go('dashboard');
        }     
          
        else 
          vm.error = data.message;
      });
  };

  // function to handle logging out
  vm.doLogout = function() {
    Auth.logout();
    vm.loggedIn = Auth.isLoggedIn();
    vm.user = '';
    
    $state.go('login');
  };

  vm.createSample = function() {
    Auth.createSampleUser();
  };

});
