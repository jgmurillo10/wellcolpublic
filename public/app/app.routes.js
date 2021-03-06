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
              'map@dashboard': { 
                  templateUrl: 'app/views/pages/default.html',
                },

              // for column two, we'll define a separate controller 
              'right-panel@dashboard': { 
                  templateUrl: 'app/views/pages/default.html'
              }
          }

    })
    .state('reports', {
      url         : "/reports",
      templateUrl : "app/views/pages/reports/reports.html",
      controller: "reportController",
      controllerAs: 'report'
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
    .state('createRegion', {
      url         : "/regions/create",
      templateUrl : "app/views/pages/regions/single.tpl.html",
      controller  : "regionCreateController",
      controllerAs: "region"
    })
    .state('editRegion', {
      url         : "/regions/edit/:region_id",
      templateUrl : "app/views/pages/regions/single.tpl.html",
      controller  : "regionEditController",
      controllerAs: "region"
    })
  
    .state('fields', {
      url         : "/regions/:region_id/fields",
      views       : {
        // the main template will be placed here (relatively named)
            '': { templateUrl: 'app/views/pages/fields/fields.html' }

      }
    })
     .state('createField', {
      url         : "/regions/:region_id/fields/create",
      templateUrl : "app/views/pages/fields/single.tpl.html",
      controller  : "fieldCreateController",
      controllerAs: "field"
    })
      .state('editField', {
      url         : "/regions/:region_id/fields/edit/:field_id",
      templateUrl : "app/views/pages/fields/single.tpl.html",
      controller  : "fieldEditController",
      controllerAs: "field"
    })
    .state('wells', {
      url         : "/regions/:region_id/fields/:field_id/wells",
      templateUrl : "app/views/pages/wells/wells.html"
    }) 
    .state('createWell', {
      url         : "/regions/:region_id/fields/:field_id/wells/create",
      templateUrl : "app/views/pages/wells/single.tpl.html",
      controller  : "wellCreateController",
      controllerAs: "well"
    })
    .state('editWell', {
      url         : "/regions/:region_id/fields/:field_id/wells/edit/:well_id",
      templateUrl : "app/views/pages/wells/single.tpl.html",
      controller  : "wellEditController",
      controllerAs: "well"
    })
    .state('sensors', {
      url         : "/regions/:region_id/fields/:field_id/wells/:well_id/sensors",
      templateUrl : "app/views/pages/sensors/sensors.html"
    })
    .state('createSensor', {
      url         : "/regions/:region_id/fields/:field_id/wells/:well_id/sensors/create",
      templateUrl : "app/views/pages/sensors/single.tpl.html",
      controller  : "sensorCreateController",
      controllerAs: "sensor"
    })
    .state('editSensor', {
      url         : "/regions/:region_id/fields/:field_id/wells/:well_id/sensors/edit/:sensor_id",
      templateUrl : "app/views/pages/sensors/single.tpl.html",
      controller  : "sensorEditController",
      controllerAs: "sensor"
    })
    .state('records', {
      url         : "/regions/:region_id/fields/:field_id/wells/:well_id/sensors/:sensor_id/records",
      templateUrl : "app/views/pages/records/records.html",
      controller  : "recordController",
      controllerAs: "record"
    });

});
