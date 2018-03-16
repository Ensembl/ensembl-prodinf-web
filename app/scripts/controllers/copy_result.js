'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:CopyResultCtrl
 * @description # CopyResultCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('CopyResultCtrl', function ($scope, $http, $routeParams, CONFIG, $location, editjob) {
	$scope.running = false;
	var jobidregex=new RegExp('^(\\d+){1}$');
	$scope.getCopyResult = function() {
	    $scope.jobResult = null;	    
	    if($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
			var url = CONFIG.DB_SRV_URL+'jobs/'+$scope.jobId;
			$scope.running = true;
			$http.get(url)
				.then(function(response) {
				$scope.jobResult = response.data;
				$scope.running = false;
				if (response.data.status === 'failed') {
					$scope.getCopyFailure();
				}
				}).catch(function (data) {	
				console.log(data);
				window.alert('Could not get result for job');
				});
	    }
	};

	$scope.getCopyFailure = function() {
		if($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
			console.log($scope.jobResult.status);
			var url = CONFIG.DB_SRV_URL+'jobs/'+$scope.jobId+'?failure=1';
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
	
	$scope.deleteCopyJob = function() {
	    if($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
			var url = CONFIG.DB_SRV_URL+'jobs/'+$scope.jobId;
			$scope.running = true;
			$http.delete(url)
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

	$scope.stopCopy = function() {
		if($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
			window.alert('Stopping the database copy in progress, please wait');
			var url = CONFIG.DB_SRV_URL+'jobs/'+$scope.jobId+'?kill=1';
			$scope.running = true;
			$http.delete(url)
			.then(function() {
			window.alert('Successfully stopped the database copy');
			$scope.running = false;
			$scope.getCopyResult();
			}).catch(function (data) {
			console.log(data);
			window.alert('Could not stop the database copy');
			});
	    }
	};

	$scope.EditReSubmitJob = function() {
		editjob.set($scope.jobResult.input);		
	    $location.url('/copy_submit');
	};
	
    $scope.refresh = function() {
	        $scope.getCopyResult();
    };

	if($routeParams.jobIdParam !== null && $routeParams.jobIdParam !== undefined) {
	    console.log($routeParams.jobIdParam);
	    $scope.jobId = $routeParams.jobIdParam;
	    $scope.getCopyResult();
	}
}
);
