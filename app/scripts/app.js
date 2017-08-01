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
	.when('/help', {
	    templateUrl:'views/help.html'
    });
});
