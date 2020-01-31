'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:CopyResultCtrl
 * @description # CopyResultCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('CopyResultCtrl', function ($scope, $http, $routeParams, CONFIG, $location, editjob, hidepassword) {
            $scope.running = false;
            $scope.hidePassword = function (data) {
                return hidepassword.hide(data);
            };
            var jobidregex = new RegExp('^(\\d+){1}$');
            $scope.getCopyResult = function () {
                $scope.jobResult = null;
                if ($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
                    var url = CONFIG.DB_SRV_URL + 'jobs/' + $scope.jobId;
                    $scope.running = true;
                    $http.get(url)
                        .then(function (response) {
                            $scope.jobResult = response.data;
                            $scope.running = false;
                            if (response.data.status === 'failed') {
                                $scope.getCopyFailure();
                            }
                        }, function (response) {
                            window.alert('Could not retrieve job: ' + response.data.error);
                            console.log(response);
                            $scope.running = false;
                        });
                }
            };

            $scope.getCopyFailure = function () {
                if ($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
                    var url = CONFIG.DB_SRV_URL + 'jobs/' + $scope.jobId + '?format=failures';
                    $scope.running = true;
                    $http.get(url)
                        .then(function (response) {
                            $scope.jobMsg = response.data;
                            $scope.running = false;
                        }, function (response) {
                            window.alert('Could not get job failures: ' + response.data.error);
                            console.log(response);
                            $scope.running = false;
                        });
                }
            };

            $scope.deleteCopyJob = function () {
                if ($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
                    var url = CONFIG.DB_SRV_URL + 'jobs/' + $scope.jobId;
                    $scope.running = true;
                    $http.delete(url)
                        .then(function () {
                            $scope.jobResult = null;
                            $scope.jobId = null;
                            $scope.running = false;
                        }, function (response) {
                            window.alert('Could not delete job: ' + response.data.error);
                            console.log(response);
                            $scope.running = false;
                        });
                }
            };

            $scope.stopCopy = function () {
                if ($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
                    window.alert('Stopping the database copy in progress, please wait');
                    var url = CONFIG.DB_SRV_URL + 'jobs/' + $scope.jobId + '?kill=1';
                    $scope.running = true;
                    $http.delete(url)
                        .then(function () {
                            window.alert('Successfully stopped the database copy');
                            $scope.running = false;
                            $scope.jobResult = null;
                            $scope.jobId = null;
                        }, function (response) {
                            window.alert('Could not stop the database copy: ' + response.data.error);
                            console.log(response);
                            $scope.running = false;
                        });
                }
            };

            $scope.EditReSubmitJob = function () {
                editjob.set($scope.jobResult.input);
                $location.url('/copy_submit');
            };

            $scope.refresh = function () {
                $scope.getCopyResult();
            };

            if ($routeParams.jobIdParam !== null && $routeParams.jobIdParam !== undefined) {
                $scope.jobId = $routeParams.jobIdParam;
                $scope.getCopyResult();
            }
        }
    );
