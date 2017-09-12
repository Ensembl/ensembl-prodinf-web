'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:MainCtrl
 * @description # MainCtrl Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp')
    .controller('ListCtrl', function ($scope, $http, $routeParams, CONFIG) {
		
		$scope.loadJobs = function() {
			var url = CONFIG.HC_SRV_URL+'jobs';
		$http.get(url)
		    .then(function(response) {
			$scope.jobs = response.data;
		    }).catch(function (data) {	
			console.log(data);
			window.alert('Could not get jobs');
		    });
		};
		$scope.loadJobs();
		
    }
    	);
