angular.module('recordService', [])

.factory('Record', function($http) {

	var recordFactory = {};
	console.log('recordService');
	recordFactory.getBySensor = function(sensor_id){
		return $http.get('/api/sensors/'+ sensor_id+'/records')
	};

	return recordFactory;
});