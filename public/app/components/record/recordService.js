angular.module('recordService', [])
.factory('Record', function($http){
	var recordFactory = {};

	recordFactory.getBySensor = function(sensor_id){
		return $http.get('/api/sensors/'+ sensor_id+'/records')
	};

	return recordFactory;
});