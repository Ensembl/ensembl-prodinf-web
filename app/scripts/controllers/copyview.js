'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:CopyViewCtrl
 * @description # MainCtrl Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp')
    .controller('CopyViewCtrl', function ($scope, $http, $routeParams, CONFIG, $location, editjob) {
    $scope.running = false;
	$scope.getCopyResult = function() {
	    $scope.jobResult = null;	    
	    if($scope.jobId !== null && $scope.jobId !== undefined) {
		var url = CONFIG.DB_SRV_URL+'results/'+$scope.jobId;
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
		console.log($scope.jobResult.status);
	    var url = CONFIG.DB_SRV_URL+'failure/'+$scope.jobId;
	    $scope.running = true;
	    $http.get(url)
	        .then(function(response) {
		    $scope.jobMsg = response.data;
		    $scope.running = false;
	        }).catch(function (data) {
		    console.log(data);
	    window.alert('Could not get job failure message');
	        });
	};
	
	$scope.deleteCopyJob = function() {
	    if($scope.jobId !== null && $scope.jobId !== undefined) {
		var url = CONFIG.DB_SRV_URL+'delete/'+$scope.jobId;
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

	$scope.stopCopy = function() {
		window.alert('Stopping the database copy in progress, please wait');
	    if($scope.jobId !== null && $scope.jobId !== undefined) {
		var url = CONFIG.DB_SRV_URL+'kill_job/'+$scope.jobId;
		$scope.running = true;
		$http.get(url)
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
	    $location.url('/copy');
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
