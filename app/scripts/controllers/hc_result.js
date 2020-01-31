'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:HCResultCtrl
 * @description # HCResultCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('HCResultCtrl', function ($scope, $http, $routeParams, CONFIG, $location, editjob, hidepassword) {
            $scope.running = false;
            $scope.hidePassword = function (data) {
                return hidepassword.hide(data);
            };
            var jobidregex = new RegExp('^(\\d+){1}$');
            $scope.Hide = '';
            $scope.getResult = function () {
                $scope.jobResult = null;
                if ($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
                    var url = CONFIG.HC_SRV_URL + 'jobs/' + $scope.jobId;
                    $scope.running = true;
                    $http.get(url)
                        .then(function (response) {
                            $scope.jobResult = response.data;
                            $scope.running = false;
                            if (response.data.status === 'failed') {
                                $scope.getFailure();
                            }
                        }, function (response) {
                            window.alert('Could not get result for job: ' + response.data.error);
                            console.log(response);
                            $scope.running = false;
                        });
                }
            };

            $scope.getFailure = function () {
                if ($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
                    var url = CONFIG.HC_SRV_URL + 'jobs/' + $scope.jobId + '?format=failures';
                    $scope.running = true;
                    $http.get(url)
                        .then(function (response) {
                            $scope.jobMsgs = response.data;
                            $scope.running = false;
                        }, function (response) {
                            window.alert('Could not get job failure: ' + response.data.error);
                            console.log(response);
                            $scope.running = false;
                        });
                }
            };

            $scope.deleteJob = function () {
                if ($scope.jobId !== null && $scope.jobId !== undefined && jobidregex.test($scope.jobId)) {
                    var url = CONFIG.HC_SRV_URL + 'jobs/' + $scope.jobId;
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

            $scope.refresh = function () {
                $scope.getResult();
            };


            $scope.toggle = function () {
                $scope.Hide = !$scope.Hide;
            };


            $scope.EditReSubmitJob = function () {
                editjob.set($scope.jobResult.input);
                $location.url('/hc_submit');
            };


            if ($routeParams.jobIdParam !== null && $routeParams.jobIdParam !== undefined) {
                $scope.jobId = $routeParams.jobIdParam;
                $scope.getResult();
            }
        }
    );
