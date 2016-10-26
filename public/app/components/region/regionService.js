angular.module('regionService', [])

.factory('Region', function($http) {

	// create a new object
	var regionFactory = {};

	// get a single region
	regionFactory.get = function(id) {
		return $http.get('/api/regions/');
	};

	// create a region
	regionFactory.create = function(regionData) {
		return $http.post('/api/regions/', regionData);
	};

	// update region
	regionFactory.update = function(id, regionData) {
		return $http.put('/api/regions/', regionData);
	};

	// delete a region
	regionFactory.delete = function(id) {
		return $http.delete('/api/regions/');
	};

	// return our entire regionFactory object
	return regionFactory;

});