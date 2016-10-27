angular.module('wellCtrl', ['wellService'])

.controller('wellController', function($stateParams, Well) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;
	vm.region_id=$stateParams.region_id;
	vm.field_id=$stateParams.field_id;
	// grab all the wells at page load
	Well.getByRegionAndField($stateParams.region_id,$stateParams.field_id)
		.success(function(data) {

			// when all the Wells come back, remove the processing variable
			vm.processing = false;

			// bind the Wells that come back to vm.Wells
			vm.wells = data;
		});

	// function to delete a Well
	vm.deleteWell = function(id) {
		vm.processing = true;

		Well.delete(id)
			.success(function(data) {

				// get all Wells to update the table
				// you can also set up your api 
				// to return the list of Wells with the delete call
				Well.get()
					.success(function(data) {
						vm.processing = false;
						vm.wells = data;
					});

			});
	};

})

// controller applied to well creation page
.controller('wellCreateController', function( Well) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a Well
	vm.saveWell = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the WellService
		Well.create(vm.wellData )
			.success(function(data) {
				vm.processing = false;
				vm.wellData = {};
				vm.message = data.message;
			});
			
	};	

})

// controller applied to Well edit page
.controller('wellEditController', function($stateParams, Well) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the Well data for the Well you want to edit
	// $routeParams is the way we grab data from the URL
	Well.get($stateParams.well_id)
		.success(function(data) {
			vm.wellData = data;
		});

	// function to save the Well
	vm.saveWell = function() {
		vm.processing = true;
		vm.message = '';

		// call the WellService function to update 
		Well.update($stateParams.well_id, vm.wellData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.wellData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

});