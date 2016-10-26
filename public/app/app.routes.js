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

    // .state('wells', {
    //   url         : "/wells",
    //   templateUrl : "app/views/pages/wells.html"
    // })
    .state('regions', {
      url         : "/regions",
      views       : {
        // the main template will be placed here (relatively named)
            '': { templateUrl: 'app/views/pages/regions/regions.html' },
             // the child views will be defined here (absolutely named)
             'map@regions': {templateUrl: 'app/views/pages/regions/map.html'},
               // for description column, we'll define a separate controller 
              'description@regions': {templateUrl: 'app/views/pages/regions/description.html'}
              // for createRegion 
              

      }
    })
     .state('regions.create', {
        url: '/regions',
        templateUrl: 'app/views/pages/regions/create.html',
        controller: 'regionController',
        controllerAs: 'region'
    })
     .state('regions.stats', {
        url: '/regions',
        templateUrl: 'app/views/pages/regions/stats.html'
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
