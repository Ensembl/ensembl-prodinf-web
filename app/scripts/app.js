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
	.when('/help', {
	    templateUrl:'views/help.html'
    });
});
