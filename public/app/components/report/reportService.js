angular.module('reportService', [])

.factory('report', function($http) {

	// create a new object
	var reportFactory = {};

	// get a single report
	reportFactory.get = function(id) {
		return $http.get('/api/reports/');
	};

	// create a report
	reportFactory.create = function(reportData) {
		return $http.post('/api/reports/', reportData);
	};

	// update report
	reportFactory.update = function(id, reportData) {
		return $http.put('/api/reports/', reportData);
	};

	// delete a report
	reportFactory.delete = function(id) {
		return $http.delete('/api/reports/');
	};

	// return our entire reportFactory object
	return reportFactory;

});