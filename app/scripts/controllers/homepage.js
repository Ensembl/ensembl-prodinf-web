'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:HomepageCtrl
 * @description # HomepageCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('HomepageCtrl', function ($scope, $http, $routeParams, CONFIG) {
        $scope.websiteName     = CONFIG.WEBSITE_NAME;
		}
    	);
