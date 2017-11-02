'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:ListCtrl
 * @description # MainCtrl Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp')
    .controller('ListCtrl', function ($scope, $http, $routeParams, CONFIG) {
	    $scope.running = false;
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
		
    }
    	);
