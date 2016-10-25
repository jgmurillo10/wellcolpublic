angular.module('fieldService', [])

.factory('field', function($http) {

	// create a new object
	var fieldFactory = {};

	// get a single field
	fieldFactory.get = function(id) {
		return $http.get('/api/fields/');
	};

	// create a field
	fieldFactory.create = function(userData) {
		return $http.post('/api/fields/', fieldData);
	};

	// update field
	fieldFactory.update = function(id, userData) {
		return $http.put('/api/fields/', fieldData);
	};

	// delete a field
	fieldFactory.delete = function(id) {
		return $http.delete('/api/fields/');
	};

	// return our entire fieldFactory object
	return fieldFactory;

});