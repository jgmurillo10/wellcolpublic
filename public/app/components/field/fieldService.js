angular.module('fieldService', [])

.factory('Field', function($http) {

	// create a new object
	var fieldFactory = {};


	// get multiple regions
	fieldFactory.getAll = function() {
		return $http.get('/api/fields/'); // returns an array of region objects, each of which contains id and name. You must save the id, otherwise when you want to update it you will need to change the backend
	};

        fieldFactory.getByRegion = function(idRegion) {
                return $http.get('/api/regions/' + idRegion + '/fields'); //returns an array of fields
        };

	// get a single field
	fieldFactory.get = function(id) {
		return $http.get('/api/fields/'); // returns something like this: "field": {    "id": 1,    "name": "aaaaaaaaa",    "region": 2  }
	};

	// create a field
	fieldFactory.create = function(fieldData) { // field that should look like this: {	"name": "Field Angelitos", 	"region" : 2}
		return $http.post('/api/fields/', fieldData);
	};

	// update field
	fieldFactory.update = function(id, fieldData) {
		return $http.put('/api/fields/' + id, fieldData);
	};

	// delete a field
	fieldFactory.delete = function(id) {
		return $http.delete('/api/fields/' + id);
	};

	// return our entire fieldFactory object
	return fieldFactory;

});