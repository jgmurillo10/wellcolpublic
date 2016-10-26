angular.module('regionService', [])

.factory('Region', function($http) {

	// create a new object
	var regionFactory = {};

	// get a single region
	regionFactory.get = function(id) {
		return $http.get('/api/regions/'); // returns an array of region objects, which contain id and name. You must save the id, otherwise when you want to update it you will need to change the backend
	};

	// create a region
	regionFactory.create = function(regionData) {
		return $http.post('/api/regions/', regionData); // region data must be like {name: "islas"}
	};

	// update region
	regionFactory.update = function(id, regionData) {
		return $http.put('/api/regions/' + id, regionData); // region data must be be like {name: "San Andrés es Islas"}
	};

	// delete a region
	regionFactory.delete = function(id) {
		return $http.delete('/api/regions/' + id); 
	};

	// return our entire regionFactory object
	return regionFactory;

});