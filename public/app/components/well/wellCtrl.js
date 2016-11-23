angular.module('wellCtrl', ['wellService', 'fieldService','ui.bootstrap'])

.controller('wellController', function($stateParams, Well, Field) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;
	vm.region_id=$stateParams.region_id;
	vm.getFieldName =function(id){
		Field.get(id)
			.success(function(data){
				vm.fieldName=data.field.name;
			})
	}
	vm.getFieldName($stateParams.field_id);

	vm.field_id=$stateParams.field_id;
	// grab all the wells at page load
	Well.getByRegionAndField($stateParams.region_id,$stateParams.field_id)
		.success(function(data) {

			// when all the Wells come back, remove the processing variable
			vm.processing = false;

			// bind the Wells that come back to vm.Wells
			if(data==='There are no wells in that field'){
				vm.wells='';
			}
			else{
				vm.wells = data;
			}
		});

	// function to delete a Well
	vm.deleteWell = function(id) {
		vm.processing = true;

		Well.delete(id)
			.success(function(data) {

				// get all Wells to update the table
				// you can also set up your api 
				// to return the list of Wells with the delete call
				Well.getByRegionAndField($stateParams.region_id,$stateParams.field_id)
					.success(function(data) {
						vm.processing = false;
						vm.wells = data;
					});

			});
	};

})

// controller applied to well creation page
.controller('wellCreateController', function($stateParams,$state,  Well) {
	
	var vm = this;
	vm.field_id=$stateParams.field_id;
	vm.region_id=$stateParams.region_id;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a Well
	vm.saveWell = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the WellService
		Well.create(vm.wellData, $stateParams.field_id )
			.success(function(data) {
				vm.processing = false;
				vm.wellData = {};
				vm.message = data.message;

				// $state.go('wells', {region_id: $stateParams.region_id,
				// 	field_id: $stateParams.field_id});
			});
			
	};	

})

// controller applied to Well edit page
.controller('wellEditController', function($stateParams,$state,  Well) {

	var vm = this;
	vm.field_id=$stateParams.field_id;
	vm.region_id=$stateParams.region_id;
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

				// $state.go('wells', {region_id: $stateParams.region_id,
				// 	field_id: $stateParams.field_id});
			});
	};

});