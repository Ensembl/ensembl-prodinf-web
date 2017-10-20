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
		console.log($scope.jobResult.status);
	    var url = CONFIG.DB_SRV_URL+'failure/'+$scope.jobId;
	    $http.get(url)
	        .then(function(response) {
		    $scope.jobMsg = response.data;
	        }).catch(function (data) {
		    console.log(data);
	    window.alert('Could not get job failure message');
	        });
	};
	
	$scope.deleteCopyJob = function() {
	    if($scope.jobId !== null && $scope.jobId !== undefined) {
		var url = CONFIG.DB_SRV_URL+'delete/'+$scope.jobId;
		$http.get(url)
	    .then(function() {
	    	$scope.jobResult = null;	  
	    	$scope.jobId = null;	  
	    }).catch(function (data) {	
		console.log(data);
		window.alert('Could not delete job');
	    });
	    }
	};

	$scope.stopCopy = function() {
		window.alert('Stopping the database copy in progress, please wait');
	    if($scope.jobId !== null && $scope.jobId !== undefined) {
		var url = CONFIG.DB_SRV_URL+'kill_hive_job/'+$scope.jobId;
		$http.get(url)
	    .then(function() {
	    window.alert('Successfully stopped the database copy');
	    $scope.getCopyResult();
	    }).catch(function (data) {
		console.log(data);
		window.alert('Could not stop the database copy');
	    });
	    }
	};


    $scope.refresh = function() {
        if($routeParams.jobIdParam !== null && $routeParams.jobIdParam !== undefined) {
            $scope.jobId = $routeParams.jobIdParam;
	        $scope.getCopyResult();
        }
    };

	if($routeParams.jobIdParam !== null && $routeParams.jobIdParam !== undefined) {
	    console.log($routeParams.jobIdParam);
	    $scope.jobId = $routeParams.jobIdParam;
	    $scope.getCopyResult();
	}
    }
	       );
