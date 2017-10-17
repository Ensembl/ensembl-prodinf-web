'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:CopyViewCtrl
 * @description # MainCtrl Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp')
    .controller('CopyViewCtrl', function ($scope, $http, $routeParams, CONFIG) {
	
	$scope.getCopyResult = function() {
	    $scope.jobResult = null;	    
	    if($scope.jobId !== null && $scope.jobId !== undefined) {
		var url = CONFIG.DB_SRV_URL+'results/'+$scope.jobId;
		$http.get(url)
		    .then(function(response) {
			$scope.jobResult = response.data;
		    }).catch(function (data) {	
			console.log(data);
			window.alert('Could not get result for job');
		    });
	    }
	};

	$scope.getCopyFailure = function() {
		var url = CONFIG.DB_SRV_URL+'failure/'+$scope.jobId;
		$http.get(url)
		    .then(function(response) {
			$scope.jobMsg = response.data;
		    }).catch(function (data) {	
			console.log(data);
/**			window.alert('Could not get job failure message'); */
		    });
	};
	
	$scope.deleteCopyJob = function() {
	    if($scope.jobId !== null && $scope.jobId !== undefined) {
		var url = CONFIG.DB_SRV_URL+'delete/'+$scope.jobId;
		$http.get(url)
	    .then(function(response) {
	    	$scope.jobResult = null;	  
	    	$scope.jobId = null;	  
	    }).catch(function (data) {	
		console.log(data);
		window.alert('Could not delete job');
	    });
	    }
	}

	if($routeParams.jobIdParam !== null && $routeParams.jobIdParam !== undefined) {
	    console.log($routeParams.jobIdParam);
	    $scope.jobId = $routeParams.jobIdParam;
	    $scope.getCopyResult();
	    $scope.getCopyFailure();
	}
    }
	       );
