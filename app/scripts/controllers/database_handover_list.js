'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:HandoverListCtrl
 * @description # HandoverListCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('HandoverListCtrl', function ($scope, $http, CONFIG, $filter, hidepassword) {
		var filter = $filter('filter');
		$scope.hidePassword = function(data) {
			return hidepassword.hide(data);
		};
		$scope.sortType     = 'report_time'; // set the default sort type
		$scope.sortReverse  = true;  // set the default sort order
		$scope.searchHandoverDatabase   = '';     // set the default search/filter term
		$scope.running = false; // default value for loading spinner
		$scope.loadHandoverJobs = function() {
			var url = CONFIG.HANDOVER_SRV_URL+'handovers';
			$scope.running = true;
		    $http.get(url)
		    .then(function(response) {
			    $scope.jobs = response.data;
			    $scope.running = false;
		    },function (response) {
					window.alert('Could not retrieve jobs: '+response.data.error);
					console.log(response);
					$scope.running = false;
				});
		};
		$scope.loadHandoverJobs();

	    $scope.refresh = function() {
			$scope.jobs=null;
			$scope.loadHandoverJobs();
		};

		$scope.deleteJobs = function() {
			angular.forEach($scope.jobs, function (value) {
				if (value.Selected){
					if(value.handover_token !== null && value.handover_token !== undefined) {
						var url = CONFIG.HANDOVER_SRV_URL+'handovers/'+value.handover_token;
						$scope.running = true;
						$http.delete(url)
						.then(function() {
							$scope.running = false;
						},function (response) {
							window.alert('Could not delete job:'+response.data.error);
							console.log(response);
							$scope.running = false;
						});
					}
				}
			});
			$scope.refresh();
			$scope.refresh();
		};

		$scope.ReSubmitJobs = function() {
			angular.forEach($scope.jobs, function (value) {
				if (value.Selected){
					if(value.handover_token !== null && value.handover_token !== undefined) {
						var input = {
						'src_uri': value.src_uri
						};
						if(value.contact!==null && value.contact!=='') {
						input.contact = value.contact;
						}
						input.comment=value.comment;
						input.source='Handover';
						var url = CONFIG.HANDOVER_SRV_URL+'handovers';
						$http.post(url, input)
						.then(function(response) {
							window.alert('Job submitted with handover token '+response.data);
						},function (response) {
							window.alert('Could not submit job'+response.data.error);
							console.log(response);
							$scope.running = false;
						});
					}
				}
			});
			$scope.refresh();
			$scope.refresh();
		};

        $scope.checkStatus = function(input) {
			var sucess = new RegExp('^(.+)Handover'+'(.+){1}'+'successful$');
			var failure = new RegExp('^(.+)failed(.+)$');
			var problems = new RegExp('^(.+)problems(.+)$');
			if (sucess.test(input)){
				return ('complete');
			}
			else if(failure.test(input) || problems.test(input)){
				return ('failed');
			}
			else{
				return ('running');
			}
		};

		$scope.checkAll = function() {
			var filtered = filter($scope.jobs, $scope.searchHandoverDatabase);
			angular.forEach(filtered, function(value) {
				value.Selected = $scope.selectAll;
			});
		};
    }
    	);
