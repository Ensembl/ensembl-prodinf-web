'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:HCListCtrl
 * @description # HCListCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('HCListCtrl', function ($scope, $http, $routeParams, CONFIG) {
	    $scope.sortType     = 'id'; // set the default sort type
        $scope.sortReverse  = true;  // set the default sort order
        $scope.searchHcJob   = '';     // set the default search/filter term
        $scope.running = false; // default value for loading spinner
		$scope.loadJobs = function() {
			var url = CONFIG.HC_SRV_URL+'jobs';
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
		$scope.loadJobs();

		$scope.refresh = function() {
			$scope.jobs=null;
			$scope.loadJobs();
		};

		$scope.deleteJobs = function() {
			angular.forEach($scope.jobs, function (value) {
				if (value.Selected){
					if(value.id !== null && value.id !== undefined) {
						var url = CONFIG.HC_SRV_URL+'jobs/'+value.id;
						$scope.running = true;
						$http.delete(url)
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
							'db_uri': value.input.db_uri
							};
							if(value.input.staging_uri!==null && value.input.staging_uri!=='') {
							input.staging_uri = value.input.staging_uri;
							}
							if(value.input.live_uri!==null && value.input.live_uri!=='') {
							input.live_uri = value.input.live_uri;
							}
							if(value.input.production_uri!==null && value.input.production_uri!=='') {
								input.production_uri = value.input.production_uri;
							}
							if(value.input.compara_uri!==null && value.input.compara_uri!=='') {
								input.compara_uri = value.input.compara_uri;
							}
							if(value.input.hc_names!==null) {
								input.hc_names = value.input.hc_names;
							}
							if(value.input.hc_groups!==null) {
								input.hc_groups = value.input.hc_groups;
							}
							if(value.input.data_files_path!==null){
								input.data_files_path = value.input.data_files_path;
							}
							if(value.input.tag!==null){
								input.tag = value.input.tag;
							}
							if(value.input.email!==null && value.input.email!=='') {
							input.email = value.input.email;
							}
							console.log(input);
							var url = CONFIG.HC_SRV_URL+'jobs';
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
