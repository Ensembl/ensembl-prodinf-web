'use strict';

/**
 * @ngdoc overview
 * @name ensemblProdinfHcserviceApp
 * @description
 * # ensemblProdinfHcserviceApp
 *
 * Main module of the application.
 */

var app = angular.module('hcSrvApp', ['app.config','ngTagsInput','ngRoute', 'mgcrea.ngStrap']);

app.config(function($routeProvider) {
    $routeProvider
	.when('/', {
	    templateUrl:'views/submit.html',
	    controller:'SubmitCtrl'
    })
	.when('/view', {
	    templateUrl:'views/view.html',
	    controller:'ViewCtrl'
    })
	.when('/view/:jobIdParam', {
	    templateUrl:'views/view.html',
	    controller:'ViewCtrl'
    })
	.when('/status', {
	    templateUrl:'views/status.html',
	    controller:'StatusCtrl'
    })
	.when('/status/:serverParam', {
	    templateUrl:'views/status.html',
	    controller:'StatusCtrl'
    })
	.when('/list', {
	    templateUrl:'views/list.html',
	    controller:'ListCtrl'
    })
    .when('/copy', {
	    templateUrl:'views/copy.html',
	    controller:'CopyCtrl'
    })
	.when('/copyview', {
	    templateUrl:'views/copyview.html',
	    controller:'CopyViewCtrl'
    })
	.when('/copyview/:jobIdParam', {
	    templateUrl:'views/copyview.html',
	    controller:'CopyViewCtrl'
    })
    .when('/copylist', {
	    templateUrl:'views/copylist.html',
	    controller:'CopyListCtrl'
    })
	.when('/help', {
	    templateUrl:'views/help.html'
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
