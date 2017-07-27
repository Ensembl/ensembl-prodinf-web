'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp')
    .controller('HeaderCtrl', function ($scope, $location) {
	$scope.isActive = function (viewLocation) { 
	    alert($location.path());
	    return $location.path().indexOf(viewLocation) == 0;
	};
    }
	       );
