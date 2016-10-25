angular.module('wellCol', ['app.routes', 'authService', 'mainCtrl','regionCtrl','regionService','fieldCtrl','fieldService','wellCtrl','wellService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

  // attach our auth interceptor to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');

});