'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp')
    .controller('ViewCtrl', function ($scope, $http, $routeParams, CONFIG) {
	
	$scope.getResult = function() {
	    $scope.jobResult = null	    
	    var url = CONFIG.HC_SRV_URL+"results/"+$scope.jobId
	    $http.get(url)
		.then(function(response) {
		    $scope.jobResult = response.data
		}).catch(function (data) {		  
		    alert("Could not get result for job") 
		});
	};

	if($routeParams.jobIdParam != null) {
	    $scope.jobId = $routeParams.jobIdParam;
	    $scope.getResult();
	}
    }
	       );
