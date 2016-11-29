angular.module('regionCtrl', ['regionService'])

  .directive('svgMap', ['$compile', function ($compile) {
      return {
          restrict: 'A',
          templateUrl: 'assets/img/reg2.svg',
          link: function (scope, element, attrs) {
              var regions = element[0].querySelectorAll('.state');
              angular.forEach(regions, function (path, key) {
                  var regionElement = angular.element(path);
                  regionElement.attr("region", "");
                  regionElement.attr("map-data", "mapData");
                  regionElement.attr("hover-region", "hoverRegion");
                  $compile(regionElement)(scope);
              })
          }
      }
  }])

  .directive('egion', ['$compile', function ($compile) {
      return {
          restrict: 'A',
          scope: {
              mapData: "=",
              hoverRegion: "="
          },
          link: function (scope, element, attrs) {
              scope.elementId = element.attr("id");
              scope.regionMouseOver = function () {
                scope.hoverRegion = scope.elementId;
                element[0].parentNode.appendChild(element[0]);
              };    
              // element.attr("ng-click", "regionClick()");
              element.attr("ng-mouseover", "regionMouseOver()");
              element.attr("ng-class", "{active:hoverRegion==elementId}");
              element.removeAttr("Region");
              $compile(element)(scope);
          }
      }
  }])

.controller('regionController',function(Region, $scope) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the regions at page load
	Region.getAll()
		.success(function(data) {

			// when all the Regions come back, remove the processing variable
			vm.processing = false;

			// bind the Regions that come back to vm.Regions
			vm.regions = data;

      // bind the map data
      var mapData = {};
      angular.forEach(data, function(key, value) {
        mapData[key.name] = key;
      });
      $scope.mapData = mapData;

      $scope.changeHoverRegion = function (region) {
        $scope.hoverRegion = region;
      }; 
		});

	// function to delete a Region
	vm.deleteRegion = function(id) {
		vm.processing = true;

		Region.delete(id)
			.success(function(data) {

        if(data.name === 'error') {
          alert('ERROR: ' + data.detail);
        }

				// get all Regions to update the table
				// you can also set up your api 
				// to return the list of Regions with the delete call
				Region.getAll()
					.success(function(data) {
						vm.processing = false;
						vm.regions = data;
					});

			});
	};

})

// controller applied to region creation page
.controller('regionCreateController', function($state, Region, $stateParams) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a Region
	vm.saveRegion = function() {
		console.log('create');
		vm.processing = true;
		vm.message = '';
		// use the create function in the RegionService
		Region.create(vm.regionData)
			.success(function(data) {
				vm.processing = false;
				vm.regionData = {};
				vm.message = data.message;
				if(typeof data.message==='undefined' || !variable){
					vm.message=data;
				}
				// $state.go('regions');
			});
			
	};	

})

// controller applied to Region edit page
.controller('regionEditController', function($stateParams, Region) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the Region data for the Region you want to edit
	// $routeParams is the way we grab data from the URL
	Region.get($stateParams.region_id)
		.success(function(data) {
			vm.regionData = data;
		});

	// function to save the Region
	vm.saveRegion = function() {
		vm.processing = true;
		vm.message = '';

		// call the RegionService function to update 
		Region.update($stateParams.region_id, vm.regionData)
			.success(function(data) {
				
				vm.processing = false;

				// clear the form
				vm.regionData = {};
				// bind the message from our API to vm.message
				vm.message = data.message;
				if(typeof data.message==='undefined' || !variable){
					vm.message=data.detail;
				}
				// $state.go('regions');
			});
	};

});