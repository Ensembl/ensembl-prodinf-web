'use strict';

/**
 * @ngdoc overview
 * @name ensemblProdinfserviceApp
 * @description
 * # ensemblProdinfserviceApp
 *
 * Main module of the application.
 */

var app = angular.module('ProdSrvApp', ['app.config','ngTagsInput','ngRoute', 'mgcrea.ngStrap']);

app.config(function($routeProvider) {
    $routeProvider
	.when('/hc_submit', {
	    templateUrl:'views/hc_submit.html',
	    controller:'HCSubmitCtrl'
    })
	.when('/hc_result', {
	    templateUrl:'views/hc_result.html',
	    controller:'HCResultCtrl'
    })
	.when('/hc_result/:jobIdParam', {
	    templateUrl:'views/hc_result.html',
	    controller:'HCResultCtrl'
    })
	.when('/database_server_status', {
	    templateUrl:'views/database_server_status.html',
	    controller:'DatabaseServerStatusCtrl'
    })
	.when('/database_server_status/:serverParam', {
	    templateUrl:'views/database_server_status.html',
	    controller:'DatabaseServerStatusCtrl'
    })
	.when('/hc_list', {
	    templateUrl:'views/hc_list.html',
	    controller:'HCListCtrl'
    })
    .when('/copy_submit', {
	    templateUrl:'views/copy_submit.html',
	    controller:'CopySubmitCtrl'
    })
	.when('/copy_result', {
	    templateUrl:'views/copy_result.html',
	    controller:'CopyResultCtrl'
    })
	.when('/copy_result/:jobIdParam', {
	    templateUrl:'views/copy_result.html',
	    controller:'CopyResultCtrl'
    })
    .when('/copy_list', {
	    templateUrl:'views/copy_list.html',
	    controller:'CopyListCtrl'
	})
	.when('/metadata_submit', {
	    templateUrl:'views/metadata_submit.html',
	    controller:'MetadataSubmitCtrl'
    })
	.when('/metadata_result', {
	    templateUrl:'views/metadata_result.html',
	    controller:'MetadataResultCtrl'
    })
	.when('/metadata_result/:jobIdParam', {
	    templateUrl:'views/metadata_result.html',
	    controller:'MetadataResultCtrl'
    })
    .when('/metadata_list', {
	    templateUrl:'views/metadata_list.html',
	    controller:'MetadataListCtrl'
    })
	.when('/help', {
	    templateUrl:'views/help.html'
	})
	.when('/', {
		templateUrl:'views/homepage.html'
	});
});

app.factory('editjob', function() {
	var jobData = null;
	function set(data) {
		jobData = data;
	}
	function get() {
	 return jobData;
	}
   
	return {
	 set: set,
	 get: get
	};
   
});
