angular.module('app.routes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true);
  $stateProvider

    // login page
    .state('login', {
      url         : "/login",
      templateUrl : "app/views/pages/login.html"
    })

    .state('home', {
      url         : "/home",
      templateUrl : "app/views/pages/home.html"
    })

    .state('wells', {
      url         : "/wells",
      templateUrl : "app/views/pages/wells.html"
    });

});
