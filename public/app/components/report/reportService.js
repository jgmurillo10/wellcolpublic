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

		uri += '/' + idArea + '/' + reportType;

		// now we add the dates

		uri += '?from=' + beginDate;
                var date1 = new Date(beginDate);
                var date2= null;
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
			return "hola";
		}
                console.log(date2.toISOString());
		uri += '&to=' +date2.toISOString();
                
                console.log(uri);
     	return $http.get(uri);
	};

	// return our entire reportFactory object
	return reportFactory;

});