'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:MetadataResultCtrl
 * @description # MetadataResultCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('MetadataResultCtrl', function ($scope, $http, $routeParams, CONFIG, $location, editjob) {
	$scope.running = false;
	var jobidregex=new RegExp('^(\\d+){1}$');
	$scope.getMetadataResult = function() {
	    $scope.jobResult = null;	    
	    if($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
			var url = CONFIG.METADATA_SRV_URL+'results/'+$scope.jobId;
			$scope.running = true;
			$http.get(url)
				.then(function(response) {
				$scope.jobResult = response.data;
				$scope.running = false;
				if (response.data.status === 'failed') {
					$scope.getMetadataFailure();
				}
				}).catch(function (data) {	
				console.log(data);
				window.alert('Could not get result for job');
				});
	    }
	};

	$scope.getMetadataFailure = function() {
		if($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
			console.log($scope.jobResult.status);
			var url = CONFIG.METADATA_SRV_URL+'failure/'+$scope.jobId;
			$scope.running = true;
			$http.get(url)
				.then(function(response) {
				$scope.jobMsg = response.data;
				$scope.running = false;
				}).catch(function (data) {
				console.log(data);
			window.alert('Could not get job failure message');
				});
		}
	};
	
	$scope.deleteMetadataJob = function() {
	    if($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
			var url = CONFIG.METADATA_SRV_URL+'delete/'+$scope.jobId;
			$scope.running = true;
			$http.get(url)
			.then(function() {
				$scope.jobResult = null;	  
				$scope.jobId = null;
				$scope.running = false;
			}).catch(function (data) {	
			console.log(data);
			window.alert('Could not delete job');
			});
	    }
	};

	$scope.EditReSubmitJob = function() {
		editjob.set($scope.jobResult.input);		
	    $location.url('/database_handover_submit');
	};
	
    $scope.refresh = function() {
	        $scope.getMetadataResult();
    };

	if($routeParams.jobIdParam !== null && $routeParams.jobIdParam !== undefined) {
	    console.log($routeParams.jobIdParam);
	    $scope.jobId = $routeParams.jobIdParam;
	    $scope.getMetadataResult();
	}
}
);
