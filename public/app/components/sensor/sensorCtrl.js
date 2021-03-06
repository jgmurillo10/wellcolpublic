angular.module('sensorCtrl', ['sensorService', 'wellService'])

.controller('sensorController', function($stateParams, Sensor, Well) {
	var vm = this;
	// set a processing variable to show loading things
	vm.processing = true;
	vm.region_id=$stateParams.region_id;
	vm.field_id=$stateParams.field_id;
	vm.well_id=$stateParams.well_id;
	
	vm.getWellName =function(id){
		Well.get(id)
			.success(function(data){
				vm.wellName=data.name;
			})
	}
	vm.getWellName($stateParams.well_id);
	// grab all the sensors at page load
	
	Sensor.getByWell($stateParams.region_id,$stateParams.field_id, $stateParams.well_id)
		.success(function(data) {

			// when all the sensors come back, remove the processing variable
			vm.processing = false;

			// bind the sensors that come back to vm.sensors
			if(data==='There are no sensors in that well'){
							vm.sensors='';
						}
						else{
							vm.sensors = data;

						}
		});


	// function to delete a sensor
	vm.deleteSensor = function(id) {
		vm.processing = true;

		Sensor.delete(id)
			.success(function(data) {

				// get all sensors to update the table
				// you can also set up your api 
				// to return the list of sensors with the delete call
				Sensor.getByWell($stateParams.region_id,$stateParams.field_id, $stateParams.well_id)
					.success(function(data) {
						vm.processing = false;
						// vm.sensors = data;

						if(data==='There are no sensors in that well'){
							vm.sensors='';
						}
						else{
							vm.sensors = data;
						}
					});

			});
	};

})

// controller applied to sensor creation page
.controller('sensorCreateController', function($stateParams, Sensor, $state) {
	
	var vm = this;
	vm.bool=true;
	vm.region_id=$stateParams.region_id;
	vm.field_id=$stateParams.field_id;
	vm.well_id=$stateParams.well_id;
	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';
		vm.setType = function(){

		if(vm.sensorData.type==='1'){
			vm.sensorData.string_type='Flow';
		}else if(vm.sensorData.type==='2'){
			vm.sensorData.string_type='Energy';	
		}else if(vm.sensorData.type==='3'){
			vm.sensorData.string_type='Temperature';	
		}else {
			vm.sensorData.string_type='Emergency';	
			vm.bool=false;
		}
	}



	// function to create a sensor
	vm.saveSensor = function() {

		vm.processing = true;
		vm.message = '';
		// use the create function in the sensorService
		Sensor.create(vm.sensorData, $stateParams.well_id )
			.success(function(data) {

		console.log('save');
				vm.processing = false;
				vm.sensorData = {};
				vm.message = data.message;

		console.log('save');
				
				$state.go('sensors', {region_id: $stateParams.region_id,
					field_id: $stateParams.field_id,
					well_id: $stateParams.well_id,
					sensor_id: $stateParams.sensor_id});
			});
			
	};	

})

// controller applied to sensor edit page
.controller('sensorEditController', function($stateParams, Sensor, $state) {

	var vm = this;
	vm.bool=true;
	vm.region_id=$stateParams.region_id;
	vm.field_id=$stateParams.field_id;
	vm.well_id=$stateParams.well_id;
	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';
		vm.setType = function(){

		if(vm.sensorData.type==='1'){
			vm.sensorData.string_type='Flow';
		}else if(vm.sensorData.type==='2'){
			vm.sensorData.string_type='Energy';	
		}else if(vm.sensorData.type==='3'){
			vm.sensorData.string_type='Temperature';	
		}else {
			vm.sensorData.string_type='Emergency';	

			vm.bool=false;
		}
	}


	// get the sensor data for the sensor you want to edit
	// $routeParams is the way we grab data from the URL
	Sensor.get($stateParams.sensor_id)
		.success(function(data) {
			vm.sensorData = data;
		});

	// function to save the sensor
	vm.saveSensor = function() {
		vm.processing = true;
		vm.message = '';

		// call the sensorService function to update 
		Sensor.update($stateParams.sensor_id, vm.sensorData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.sensorData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
				$state.go('sensors', {region_id: $stateParams.region_id,
					field_id: $stateParams.field_id,
					well_id: $stateParams.well_id,
					sensor_id: $stateParams.sensor_id});
			});
	};

});