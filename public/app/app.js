angular.module('wellCol', ['app.routes', 'authService', 'mainCtrl','regionCtrl','regionService','fieldCtrl','fieldService','wellCtrl','wellService', 'reportCtrl', 'reportService'])

// application configuration to integrate token into requests
.config(function($httpProvider, $stateProvider) {

  // attach our auth interceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');

});