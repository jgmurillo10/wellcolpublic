angular.module('app.routes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/home");
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
    .state('dashboard', {
      url         : "/dashboard",
      templateUrl : "app/views/pages/dashboard.html"

    })
    .state('dashboard.list', {
          url: '/test',
          templateUrl: 'app/views/pages/regions/regions.html',
          controller: function($scope) {
              // Anything we want
          }
      })
    .state('regions', {
      url         : "/regions",
      templateUrl : "app/views/pages/regions/regions.html"
    })
    .state('fields', {
      url         : "/regions/fields",
      templateUrl : "app/views/pages/fields/fields.html"
    })
    .state('wells', {
      url         : "/regions/fields/wells",
      templateUrl : "app/views/pages/wells/wells.html"
    });

});
