angular.module('reportService', [])

.factory('Report', function($http) {

	// create a new object
	var reportFactory = {};

	// get a single report
	reportFactory.get = function(reportArea, reportType, idArea, beginDate) {
		
		var uri = '/api/reports/';
		if(reportArea === 'zone'){
			uri += 'zones'
		}
		else if(reportArea === 'field'){
			uri += 'fields'
		}
		else if(reportArea === 'well'){
			uri += 'wells'
		}
		else {
			return error; // how to throw and error?
		}

		uri += '/' + idArea;
		uri += '/' + reportType;

		// now we add the dates
		
		

		if()
		return $http.get('/api/reports/');
	};

	// return our entire reportFactory object
	return reportFactory;

});