angular.module('wellService', [])

.factory('Well', function($http) {

	// create a new object
	var wellFactory = {};
        
        wellFactory.getAll = function() {
            return $http.get('/api/wells');
        };
	// get a single well
	wellFactory.get = function(id) {
		return $http.get('/api/wells/' + id);
	};
        
        wellFactory.getByRegionAndField = function(idRegion, idField) {
            return $http.get('/api/regions/' + idRegion + '/fields/' + idField);
        };

	// create a well
	wellFactory.create = function(wellData) {
		return $http.post('/api/wells/', wellData);
	};

	// update well
	wellFactory.update = function(id, wellData) {
		return $http.put('/api/wells/' + id, wellData);
	};

	// delete a well
	wellFactory.delete = function(id) {
		return $http.delete('/api/wells/' + id);
	};

	// return our entire wellFactory object
	return wellFactory;

});