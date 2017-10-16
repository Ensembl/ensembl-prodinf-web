'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:CopyListCtrl
 * @description # MainCtrl Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp')
    .controller('CopyListCtrl', function ($scope, $http, $routeParams, CONFIG) {
		
		$scope.loadCopyJobs = function() {
			var url = CONFIG.DB_SRV_URL+'jobs';
		$http.get(url)
		    .then(function(response) {
			$scope.jobs = response.data;
		    }).catch(function (data) {	
			console.log(data);
			window.alert('Could not get jobs');
		    });
		};
		$scope.loadCopyJobs();
		
    }
    	);
