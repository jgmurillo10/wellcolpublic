angular.module('recordCtrl', ['recordService'])

.controller('recordController', function($stateParams, Record, $scope) {
 	
  	var vm=this;

	//set a processing var to show loading things
	vm.processing = true;
	vm.sensor_id=$stateParams.sensor_id;
	vm.well_id=$stateParams.well_id;
	vm.field_id=$stateParams.field_id;
	vm.region_id=$stateParams.region_id;

	Record.getBySensor($stateParams.sensor_id)
		.success(function(data) {

			// when all the sensors come back, remove the processing variable
			vm.processing = false;

			// bind the sensors that come back to vm.sensors
			console.log('data: '+data)
			vm.records = data;
			console.log('1');
		});


		// code paginacion

		// $scope.filteredTodos = []
	 //  ,$scope.currentPage = 1
	 //  ,$scope.numPerPage = 10
	 //  ,$scope.maxSize = 5;
	 //  	console.log(':)');
	 //   $scope.makeTodos = function() {
	 //   	console.log($scope.todos);
	 //    $scope.todos
	 //    for (i=1;i<=1000;i++) {
	 //      $scope.todos.push({ text:'todo '+i, done:false});
	 //      console.log(':)');
	 //    }
	 //  };
	 //  $scope.makeTodos(); 
	  
	 //  $scope.numPages = function () {
	 //  	console.log(':)');
	 //    return Math.ceil($scope.todos.length / $scope.numPerPage);
	 //  };
	  
	 //  $scope.$watch('currentPage + numPerPage', function() {
	 //    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	 //    , end = begin + $scope.numPerPage;
	 //    console.log(':)');
	 //    $scope.filteredTodos = $scope.todos.slice(begin, end);
	 //  });	
	  //end pagination

});