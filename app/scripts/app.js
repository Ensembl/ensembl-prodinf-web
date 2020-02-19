'use strict';

/**
 * @ngdoc overview
 * @name ensemblProdinfserviceApp
 * @description
 * # ensemblProdinfserviceApp
 *
 * Main module of the application.
 */

var app = angular.module('ProdSrvApp', ['app.config',
        'ngTagsInput', 'ngRoute', 'mgcrea.ngStrap', 'ngSanitize'],
    function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });

app.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/hc_submit', {
            templateUrl: '/views/hc_submit.html',
            controller: 'HCSubmitCtrl'
        })
        .when('/hc_result', {
            templateUrl: '/views/hc_result.html',
            controller: 'HCResultCtrl'
        })
        .when('/hc_result/:jobIdParam', {
            templateUrl: '/views/hc_result.html',
            controller: 'HCResultCtrl'
        })
        .when('/database_server_status', {
            templateUrl: '/views/database_server_status.html',
            controller: 'DatabaseServerStatusCtrl'
        })
        .when('/database_server_status/:serverParam', {
            templateUrl: '/views/database_server_status.html',
            controller: 'DatabaseServerStatusCtrl'
        })
        .when('/database_server_size', {
            templateUrl: '/views/database_server_size.html',
            controller: 'DatabaseServerSizeCtrl'
        })
        .when('/hc_list', {
            templateUrl: '/views/hc_list.html',
            controller: 'HCListCtrl'
        })
        .when('/copy_submit', {
            templateUrl: '/views/copy_submit.html',
            controller: 'CopySubmitCtrl'
        })
        .when('/copy_result', {
            templateUrl: '/views/copy_result.html',
            controller: 'CopyResultCtrl'
        })
        .when('/copy_result/:jobIdParam', {
            templateUrl: '/views/copy_result.html',
            controller: 'CopyResultCtrl'
        })
        .when('/copy_list', {
            templateUrl: '/views/copy_list.html',
            controller: 'CopyListCtrl'
        })
        .when('/database_handover_submit', {
            templateUrl: '/views/database_handover_submit.html',
            controller: 'HandoverSubmitCtrl'
        })
        .when('/database_handover_result', {
            templateUrl: '/views/database_handover_result.html',
            controller: 'HandoverResultCtrl'
        })
        .when('/database_handover_result/:handoverTokenParam', {
            templateUrl: '/views/database_handover_result.html',
            controller: 'HandoverResultCtrl'
        })
        .when('/database_handover_list', {
            templateUrl: '/views/database_handover_list.html',
            controller: 'HandoverListCtrl'
        })
        .when('/help', {
            templateUrl: '/views/help.html'
        })
        .when('/', {
            templateUrl: '/views/homepage.html',
            controller: 'HomepageCtrl'
        });
});

// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope, CONFIG) {
    $scope.websiteName = CONFIG.FLASK_APP;
    $scope.app_path = CONFIG.FLASK_PATH;
});


app.factory('editjob', function () {
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

app.factory('hidepassword', function () {
    return {
        hide: function (data) {
            var dburlpattern = new RegExp('^(mysql:\/\/){1}' + /* engine:// */
                '(\\w+){1}' + /* user */
                '(:)?' + /* : (optional) */
                '(.+)?' + /* password (optional) */
                '(@){1}' + /* @ */
                '(.+){1}' + /* server_name */
                '(:){1}' + /* : */
                '(\\d+){1}' + /* port */
                '(\/){1}' + /* end_of_url/ */
                '(.+)?$'); /* database_name */
            var urlnopassword = dburlpattern.exec(data);
            if (urlnopassword !== null && urlnopassword[4] !== undefined) {
                return data.replace(urlnopassword[4], 'xxxxx');
            } else {
                return data;
            }
        }
    };
});
