'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:StatusCtrl
 * @description # MainCtrl Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp')
    .controller('StatusCtrl', function ($scope, $http, $routeParams, CONFIG) {
        $scope.searchButtonText = 'Submit';
		$scope.running = false;
    	$scope.getStatus = function() {
    	    $scope.serverStatus = null;	    
    	    if($scope.serverName !== null && $scope.serverName !== undefined) {
    		var url = CONFIG.DB_SRV_URL+'status/'+$scope.serverName;
			$scope.searchButtonText = 'Fetching';
			$scope.running = true;
    		$http.get(url)
    		    .then(function(response) {
    			$scope.serverStatus = response.data;
                $scope.searchButtonText = 'Submit';
    			$scope.running = false;
    		    }).catch(function (data) {	
    			console.log(data);
    			window.alert('Could not get status for server');
    		    });
    	    }
    	};

    	if($routeParams.serverParam !== null && $routeParams.serverParam !== undefined) {
    	    console.log($routeParams.serverParam);
    	    $scope.serverName = $routeParams.serverParam;
    	    $scope.getStatus();
    	}
    }
    	);
