'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:MetadataListCtrl
 * @description # MetadataListCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('MetadataListCtrl', function ($scope, $http, $routeParams, CONFIG) {
        $scope.sortType     = 'id'; // set the default sort type
        $scope.sortReverse  = true;  // set the default sort order
        $scope.searchMetadataLoadJob   = '';     // set the default search/filter term
        $scope.running = false; // default value for loading spinner
		$scope.loadMetadataJobs = function() {
			var url = CONFIG.METADATA_SRV_URL+'jobs';
			$scope.running = true;
		    $http.get(url)
		    .then(function(response) {
			$scope.jobs = response.data;
			$scope.running = false;
		    }).catch(function (data) {	
			console.log(data);
			window.alert('Could not get jobs');
		    });
		};
		$scope.loadMetadataJobs();

	    $scope.refresh = function() {
			$scope.jobs=null;
			$scope.loadMetadataJobs();
		};

		$scope.deleteJobs = function() {
			angular.forEach($scope.jobs, function (value) {
				if (value.Selected){
					if(value.id !== null && value.id !== undefined) {
						var url = CONFIG.METADATA_SRV_URL+'delete/'+value.id;
						$scope.running = true;
						$http.get(url)
						.then(function() {
							$scope.running = false;
						}).catch(function (data) {
						console.log(data);
						window.alert('Could not delete job ID '+value.id);
						});
					}
				}
			});
			$scope.refresh();
			$scope.refresh();
		};

		$scope.ReSubmitJobs = function() {
			angular.forEach($scope.jobs, function (value) {
				if (value.Selected){
					if(value.id !== null && value.id !== undefined) {
						var input = {
						'database_uri': value.input.database_uri
						};
						if(value.input.email!==null && value.input.email!=='') {
						input.email = value.input.email;
						}
						input.metadata_uri=CONFIG.METADATA_URI;
						console.log(input);
						var url = CONFIG.METADATA_SRV_URL+'submit';
						console.log('POSTing to '+url);
						$http.post(url, input)
						.then(function(response) {
							console.log(response);
							window.alert('Job submitted with ID '+response.data.job_id);
						}).catch(function (data) {
							window.alert('Could not submit job: '+data);
						});
					}
				}
			});
			$scope.refresh();
			$scope.refresh();
		};


		$scope.checkAll = function() {
			angular.forEach($scope.jobs, function(value) {
				value.Selected = $scope.selectAll;
			});
		};
    }
    	);
