angular.module('wellService', [])

.factory('Well', function($http) {

	// create a new object
	var wellFactory = {};

	// get a single well
	wellFactory.get = function(id) {
		return $http.get('/api/wells/');
	};

	// create a well
	wellFactory.create = function(wellData) {
		return $http.post('/api/wells/', wellData);
	};

	// update well
	wellFactory.update = function(id, wellData) {
		return $http.put('/api/wells/', wellData);
	};

	// delete a well
	wellFactory.delete = function(id) {
		return $http.delete('/api/wells/');
	};

	// return our entire wellFactory object
	return wellFactory;

});