'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:HCResultCtrl
 * @description # MainCtrl Controller of the ensemblProdinfHcserviceApp
 */


angular.module('ProdSrvApp')
    .controller('HCResultCtrl', function ($scope, $http, $routeParams, CONFIG, $location, editjob) {
	$scope.running = false;
	$scope.getResult = function() {
	    $scope.jobResult = null;	    
	    if($scope.jobId !== null && $scope.jobId !== undefined) {
		var url = CONFIG.HC_SRV_URL+'results/'+$scope.jobId;
		$scope.running = true;
		$http.get(url)
		    .then(function(response) {
			$scope.jobResult = response.data;
			$scope.running = false;
			if (response.data.status === 'failed') {
	            $scope.getFailure();
	        }
		    }).catch(function (data) {	
			console.log(data);
			window.alert('Could not get result for job');
		    });
	    }
	};

	$scope.getFailure = function() {
		console.log($scope.jobResult.status);
	    var url = CONFIG.HC_SRV_URL+'failures/'+$scope.jobId;
	    $scope.running = true;
	    $http.get(url)
	        .then(function(response) {
		    $scope.jobMsgs = response.data;
		    $scope.running = false;
	        }).catch(function (data) {
		    console.log(data);
	    window.alert('Could not get job failure message');
	        });
	};
	
	$scope.deleteJob = function() {
	    if($scope.jobId !== null && $scope.jobId !== undefined) {
		var url = CONFIG.HC_SRV_URL+'delete/'+$scope.jobId;
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

	$scope.refresh = function() {
      $scope.jobId = $routeParams.jobIdParam;
	  $scope.getResult();
	};


	$scope.EditReSubmitJob = function() {
		editjob.set($scope.jobResult.input);
	    $location.url('/hc_submit');
	};


	if($routeParams.jobIdParam !== null && $routeParams.jobIdParam !== undefined) {
	    console.log($routeParams.jobIdParam);
	    $scope.jobId = $routeParams.jobIdParam;
	    $scope.getResult();
	}
    }
	       );