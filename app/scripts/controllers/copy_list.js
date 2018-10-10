'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:CopyListCtrl
 * @description # CopyListCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('CopyListCtrl', function ($scope, $http, $routeParams, CONFIG, $filter) {
			  var filter = $filter('filter');
        $scope.sortType     = 'id'; // set the default sort type
        $scope.sortReverse  = true;  // set the default sort order
        $scope.searchDbCopyJob   = '';     // set the default search/filter term
        $scope.running = false; // default value for loading spinner
		$scope.loadCopyJobs = function() {
			var url = CONFIG.DB_SRV_URL+'jobs';
			$scope.running = true;
		    $http.get(url)
		    .then(function(response) {
			$scope.jobs = response.data;
			$scope.running = false;
		    },function (response) {
					window.alert('Could not retrieve jobs: '+response.data.error);
					$scope.running = false;
				});
		};
		$scope.loadCopyJobs();

	    $scope.refresh = function() {
			$scope.jobs=null;
			$scope.loadCopyJobs();
		};

		$scope.deleteJobs = function() {
			angular.forEach($scope.jobs, function (value) {
				if (value.Selected){
					if(value.id !== null && value.id !== undefined) {
						var url = CONFIG.DB_SRV_URL+'jobs/'+value.id;
						$scope.running = true;
						$http.delete(url)
						.then(function() {
							$scope.running = false;
						},function (response) {
							window.alert('Could not delete job: '+response.data.error);
							$scope.running = false;
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
						'source_db_uri': value.input.source_db_uri
						};
				
						input.target_db_uri = value.input.target_db_uri;
				
						if(value.input.only_tables!==null && value.input.only_tables!=='') {
						input.only_tables = value.input.only_tables;
						}
						if(value.input.skip_tables!==null && value.input.skip_tables!=='') {
						input.skip_tables = value.input.skip_tables;
						}
						if(value.input.update!==null && value.input.update!=='') {
						input.update = value.input.update;
						}
						if(value.input.drop!==null && value.input.drop!=='') {
						input.drop = value.input.drop;
						}
						if(value.input.email!==null && value.input.email!=='') {
						input.email = value.input.email;
						}
						console.log(input);
						var url = CONFIG.DB_SRV_URL+'jobs';
						console.log('POSTing to '+url);
						$http.post(url, input)
						.then(function(response) {
							console.log(response);
							window.alert('Job submitted with ID '+response.data.job_id);
						},function (response) {
							window.alert('Could not submit job: '+response.data.error);
							$scope.running = false;
						});
					}
				}
			});
			$scope.refresh();
			$scope.refresh();
		};


		$scope.checkAll = function() {
			var filtered = filter($scope.jobs, $scope.searchDbCopyJob);
			angular.forEach(filtered, function(value) {
				value.Selected = $scope.selectAll;
			});
		};
    }
    	);
