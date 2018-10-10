'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:DatabaseServerSizeCtrl
 * @description # DatabaseServerSizeCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('DatabaseServerSizeCtrl', function ($scope, $http, $routeParams, CONFIG) {
	  	$scope.running = false;
		  $scope.dirName = '/instances';
    	$scope.getDatabaseSize = function() {
			$scope.databaseSize = null;
            if($scope.ServerName !== null && $scope.ServerName !== undefined) {
				if ($scope.dbName === null || $scope.dbName === undefined){
					$scope.dbName = '.';
				}
				var url = CONFIG.DB_SRV_URL+'databases/sizes?db_uri='+$scope.ServerName+'&query='+$scope.dbName+'&dir_name='+$scope.dirName;
				$scope.running = true;
				$http.get(url)
					.then(function(response) {
					var databaseSize = response.data;
					$scope.databaseSize = [];
					angular.forEach(databaseSize, function(value, key) {
							$scope.databaseSize.push({
									key: key,
									size: value
							});
					});
					$scope.running = false;
					},function (response) {
						$scope.running = false;
						window.alert("Could not get database size for server: "+response.data.error);
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

		$scope.getDbs = function(query) {
			if(query===null || query === '' || $scope.ServerName === null || $scope.ServerName === '') {
			  return [];
			}
			var url = CONFIG.DB_SRV_URL+'databases?query=' + query + '&db_uri='+$scope.ServerName;
			console.log(url);
			return $http.get(url)
			.then(function(res) {
				console.log(res.data);
				return res.data;
			});
		};
		
		$scope.formatBytes = function (bytes, decimals, binaryUnits) {
			if(bytes === 0) {
				return '0 Bytes';
			}
			var unitMultiple = (binaryUnits) ? 1024 : 1000; 
			var unitNames = (unitMultiple === 1024) ? // 1000 bytes in 1 Kilobyte (KB) or 1024 bytes for the binary version (KiB)
				['MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']: 
				['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			var unitChanges = Math.floor(Math.log(bytes) / Math.log(unitMultiple));
			return parseFloat((bytes / Math.pow(unitMultiple, unitChanges)).toFixed(decimals || 0)) + ' ' + unitNames[unitChanges];
		};

    }
    	);
