'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:CopyListCtrl
 * @description # MainCtrl Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp')
    .controller('CopyListCtrl', function ($scope, $http, $routeParams, CONFIG) {
        $scope.sortType     = 'id'; // set the default sort type
        $scope.sortReverse  = true;  // set the default sort order
        $scope.searchDbCopyJob   = '';     // set the default search/filter term
        $scope.running = false; // default value for loading spinner
		$scope.loadCopyJobs = function() {
			var url = CONFIG.DB_SRV_URL+'jobs';
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
		$scope.loadCopyJobs();
		
    }
    	);
