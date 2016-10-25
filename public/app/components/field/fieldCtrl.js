angular.module('fieldCtrl', ['fieldService'])

.controller('fieldController', function(field) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the fields at page load
	field.get()
		.success(function(data) {

			// when all the fields come back, remove the processing variable
			vm.processing = false;

			// bind the fields that come back to vm.fields
			vm.fields = data;
		});

	// function to delete a field
	vm.deleteField = function(id) {
		vm.processing = true;

		field.delete(id)
			.success(function(data) {

				// get all fields to update the table
				// you can also set up your api 
				// to return the list of fields with the delete call
				field.get()
					.success(function(data) {
						vm.processing = false;
						vm.fields = data;
					});

			});
	};

})

// controller applied to field creation page
.controller('fieldCreateController', function(field) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a field
	vm.saveField = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the fieldService
		field.create(vm.fieldData)
			.success(function(data) {
				vm.processing = false;
				vm.fieldData = {};
				vm.message = data.message;
			});
			
	};	

})

// controller applied to field edit page
.controller('fieldEditController', function($routeParams, field) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the field data for the field you want to edit
	// $routeParams is the way we grab data from the URL
	field.get($routeParams.field_id)
		.success(function(data) {
			vm.fieldData = data;
		});

	// function to save the field
	vm.saveField = function() {
		vm.processing = true;
		vm.message = '';

		// call the fieldService function to update 
		field.update($routeParams.field_id, vm.fieldData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.fieldData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

});