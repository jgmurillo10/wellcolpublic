angular.module('reportService', [])

.factory('Report', function($http) {

	// create a new object
	var reportFactory = {};

	// get a single report
	reportFactory.get = function(reportArea, reportType, idArea, beginDate, reportPeriod) { // begin date must be in the correct format
		
		var uri = '/api/reports/';
		if(reportArea === 'region'){
			uri += 'regions'
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

		uri += '?from=' + beginDate;
		var parts = input.split('-');
  		// new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    	var date1 = new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
    	var date2;


		if(reportPeriod=== 'monthly'){
			date2 = new Date(new Date(date1).setMonth(date1.getMonth()+1));
		}
		else if(reportPeriod=== 'quarterly'){
			date2 = new Date(new Date(date1).setMonth(date1.getMonth()+3));
		}
		else if(reportPeriod=== 'biannual'){
			date2 = new Date(new Date(date1).setMonth(date1.getMonth()+6));
		}
		else if(reportPeriod=== 'annual'){
			date2 = new Date(new Date(date1).setMonth(date1.getMonth()+12));
		}
		else {
			return error;
		}

		uri += date1 + '&to=' +date2;

     	return $http.get(uri);
	};

	// return our entire reportFactory object
	return reportFactory;

});