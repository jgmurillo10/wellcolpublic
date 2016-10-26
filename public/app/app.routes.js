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
      views: { // here we are talking about the concept of view. You can have multiple views on the same state

              // the main template will be placed here (relatively named)
              '': { templateUrl: 'app/views/pages/dashboard.html' },

              // the child views will be defined here (absolutely named)
              'map@dashboard': { template: 'Here is where the map goes!' },

              // for column two, we'll define a separate controller 
              'right-panel@dashboard': { 
                  templateUrl: 'app/views/pages/default.html'
              }
          }

    })
    .state('reports', {
      url         : "/reports",
      templateUrl : "app/views/pages/reports/reports.html"
    })
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
        url: '/:id',
        templateUrl: 'app/views/pages/regions/create.html',
        controller: 'regionCreateController',
        controllerAs: 'create'
    })
     .state('regions.stats', {
        // url: '/',
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
