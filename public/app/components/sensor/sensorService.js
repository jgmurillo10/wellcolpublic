angular.module('sensorService', [])

.factory('Sensor', function($http) {

	// create a new object
	var sensorFactory = {};
        
        sensorFactory.getAll = function() {
            return $http.get('/api/sensors');
        };
	// get a single sensor
	sensorFactory.get = function(id) {
		return $http.get('/api/sensors/' + id);
	};
        
        sensorFactory.getByWell = function(region_id,field_id,well_id) {
            return $http.get('/api/regions/' + region_id + '/fields/' + field_id+'/wells/'+well_id+'/sensors');
        };

	// create a sensor
	sensorFactory.create = function(sensorData, well_id) {
		sensorData.well_id=well_id;
		if (typeof sensorData.rate=== undefined || !sensorData.rate)
			{
				sensorData.rate=0;
			}
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