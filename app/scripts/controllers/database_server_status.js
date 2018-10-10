'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:DatabaseServerStatusCtrl
 * @description # DatabaseServerStatusCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('DatabaseServerStatusCtrl', function ($scope, $http, $routeParams, CONFIG) {
		$scope.running = false;
    	$scope.getStatus = function() {
			$scope.serverStatus = null;
            if($scope.ServerName !== null && $scope.ServerName !== undefined) {
			var FinalServerName = $scope.splitUri($scope.ServerName);
            var url = CONFIG.DB_SRV_URL+'hosts/'+FinalServerName;
			$scope.running = true;
    		$http.get(url)
    		    .then(function(response) {
    			$scope.serverStatus = response.data;
    			$scope.running = false;
                },function (response) {
                    $scope.running = false;
					window.alert("Could not get status for server: "+response.data.error);
					console.log(response);
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

		$scope.splitUri = function(value){
			var urlpattern = new RegExp('^(mysql:\/\/){1}'+ /* engine:// */
			'(.+){1}'+ /* user */
			'(:.+){0,1}'+ /* :password (optional) */
			'(@){1}'+ /* @ */
			'(.+){1}'+ /* server_name */
			'(:){1}'+ /* : */
			'(\\d+){1}'+ /* port */
			'(\/){1}$'); /* end_of_url/ */
			if (urlpattern.test(value))
			{
				value = value.split('@')[1].split(':')[0];
			}
			return value;
		};

    	if($routeParams.serverParam !== null && $routeParams.serverParam !== undefined) {
    	    console.log($routeParams.serverParam);
    	    $scope.serverName = $routeParams.serverParam;
    	    $scope.getStatus();
    	}
    }
    	);
