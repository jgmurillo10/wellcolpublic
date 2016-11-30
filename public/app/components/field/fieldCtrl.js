angular.module('fieldCtrl', ['fieldService','regionService'])

.controller('fieldController', function($stateParams,Field, Region) {

	var vm = this;
	vm.region_id=$stateParams.region_id;
	
	vm.getRegionName =function(id){
		Region.get(id)
			.success(function(data){
				vm.regionName=data.name;
			})
	}
	vm.getRegionName($stateParams.region_id);
	// set a processing variable to show loading things
	vm.processing = true;
	// grab all the fields at page load
	
		Field.getByRegion($stateParams.region_id)
		.success(function(data) {

			// when all the fields come back, remove the processing variable
			vm.processing = false;

			// bind the fields that come back to vm.fields
			vm.fields = data;
		});
	

	// function to delete a field
	vm.deleteField = function(id) {
		vm.processing = true;

		Field.delete(id)
			.success(function(data) {

				// get all fields to update the table
				// you can also set up your api 
				// to return the list of fields with the delete call
				Field.getByRegion($stateParams.region_id)
					.success(function(data) {
						vm.processing = false;
						vm.fields = data;
					});

			});
	};

})

// controller applied to field creation page
.controller('fieldCreateController', function($stateParams,$state, Field) {
	
	var vm = this;
vm.region_id=$stateParams.region_id;
	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a field
	vm.saveField = function() {
		vm.processing = true;
		vm.message = '';
		// fieldData.region=$stateParams.region_id;

		// use the create function in the fieldService
		Field.create(vm.fieldData, $stateParams.region_id)
			.success(function(data) {
				vm.processing = false;
				vm.fieldData = {};
				vm.message = data.message;
				// $state.go('fields', {region_id: $stateParams.region_id});
			});
			
	};	
	console.log('aaa');
})

// controller applied to field edit page
.controller('fieldEditController', function($stateParams,$state, Field) {
var vm=this;
vm.region_id=$stateParams.region_id;
   // vm.region_id=$stateParams.region_id;
	console.log('enter edit field')


	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the field data for the field you want to edit
	// $routeParams is the way we grab data from the URL
	Field.get($stateParams.field_id)
		.success(function(data) {
			vm.fieldData = data;
		});

	// function to save the field
	vm.saveField = function() {
		vm.processing = true;
		vm.message = '';

		// call the fieldService function to update 
		Field.update($stateParams.field_id, vm.fieldData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.fieldData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
				// $state.go('fields', {region_id: $stateParams.region_id});
			});
	};

});