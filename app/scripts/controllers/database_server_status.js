'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:DatabaseServerStatusCtrl
 * @description # DatabaseServerStatusCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('DatabaseServerStatusCtrl', function ($scope, $http, $routeParams, CONFIG) {
        $scope.searchButtonText = 'Submit';
		$scope.running = false;
    	$scope.getStatus = function() {
			$scope.serverStatus = null;
            if($scope.ServerName !== null && $scope.ServerName !== undefined) {
            var url = CONFIG.DB_SRV_URL+'hosts/'+$scope.ServerName.split('@')[1].split(':')[0];
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

		$scope.getServerNames = function(query) {
			if(query===null || query === '' || $scope.ServerName === null || $scope.ServerName === '') {
			  return [];
			}
			var url = CONFIG.DB_SRV_URL+'servers/'+CONFIG.URI_USER+'?query=' + query;
			console.log(url);
			return $http.get(url)
			.then(function(res) {
				console.log(res.data);
				return res.data;
			});
		};

    	if($routeParams.serverParam !== null && $routeParams.serverParam !== undefined) {
    	    console.log($routeParams.serverParam);
    	    $scope.serverName = $routeParams.serverParam;
    	    $scope.getStatus();
    	}
    }
    	);
