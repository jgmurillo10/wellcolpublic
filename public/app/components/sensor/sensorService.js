angular.module('sensorService', [])

.factory('sensor', function($http) {

	// create a new object
	var sensorFactory = {};
        
        sensorFactory.getAll = function() {
            return $http.get('/api/sensors');
        };
	// get a single sensor
	sensorFactory.get = function(id) {
		return $http.get('/api/sensors/' + id);
	};
        
        sensorFactory.getByRegionAndField = function(idRegion, idField) {
            return $http.get('/api/regions/' + idRegion + '/fields/' + idField+'/sensors');
        };

	// create a sensor
	sensorFactory.create = function(sensorData, field_id) {
		sensorData.field_id=field_id;
		return $http.post('/api/sensors/', sensorData);
	};

	// update sensor
	sensorFactory.update = function(id, sensorData) {
		return $http.put('/api/sensors/' + id, sensorData);
	};

	// delete a sensor
	sensorFactory.delete = function(id) {
		return $http.delete('/api/sensors/' + id);
	};

	// return our entire sensorFactory object
	return sensorFactory;

});