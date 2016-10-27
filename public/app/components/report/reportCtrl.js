angular.module('reportCtrl', ['reportService', 'fieldService', 'wellService', 'regionService'])

.controller('reportController', function(Report, Field, Well, Region) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// varibles for grabing  all the date for making a report
	vm.reportArea;
	vm.reportType;
	vm.idArea;
	vm.beginDate;
	vm.reportPeriod;

	vm.array = [];

	vm.reports ={};

	vm.listarObjetos = function(){
		if(vm.reportArea === 'well')
		{
			Well.getAll()
			.success (function(data) {

				vm.array = data;
			});
		}
		else if(vm.reportArea=== 'field')
		{
			
			Field.getAll()
			.success (function(data) {
				vm.array = data;

			});
			
		}
		else if(vm.reportArea === 'region')
		{
			Region.getAll()
			.success (function (data) {
				vm.array = data;
			});		
		}
		else
		{
			return "hola";
		}
	};
	// it is used for changing the views properly

	vm.generate=function(){
		Report.get(reportArea, reportType, idArea, beginDate, reportPeriod)
		.success(function(data) {

			// when all the reports come back, remove the processing variable
			vm.processing = false;

			// bind the reports that come back to vm.reports
			vm.reports = data;
		});
	}
	// function to delete a report
	vm.deleteReport = function(id) {
		vm.processing = true;

		report.delete(id)
			.success(function(data) {

				// get all reports to update the table
				// you can also set up your api 
				// to return the list of reports with the delete call
				report.get()
					.success(function(data) {
						vm.processing = false;
						vm.reports = data;
					});

			});
	};

})
// controller applied to report creation page
.controller('reportCreateController', function(report) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a report
	vm.saveReport = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the reportService
		report.create(vm.reportData)
			.success(function(data) {
				vm.processing = false;
				vm.reportData = {};
				vm.message = data.message;
			});
			
	};	

})

// controller applied to report edit page
.controller('reportEditController', function($routeParams, report) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the report data for the report you want to edit
	// $routeParams is the way we grab data from the URL
	report.get($routeParams.report_id)
		.success(function(data) {
			vm.reportData = data;
		});

	// function to save the report
	vm.saveReport = function() {
		vm.processing = true;
		vm.message = '';

		// call the reportService function to update 
		report.update($routeParams.report_id, vm.reportData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.reportData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

});