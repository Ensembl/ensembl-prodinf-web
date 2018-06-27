'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:HandoverListCtrl
 * @description # HandoverListCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('HandoverListCtrl', function ($scope, $http, $routeParams, CONFIG) {
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
		    }).catch(function (data) {	
			console.log(data);
			window.alert('Could not get jobs');
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
						console.log(url);
						$http.delete(url)
						.then(function() {
							$scope.running = false;
						}).catch(function (data) {
						console.log(data);
						window.alert('Could not delete job ID '+value.handover_token);
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
						input.type=value.type;
						input.comment=value.comment;
						input.source='Handover';
						console.log(input);
						var url = CONFIG.HANDOVER_SRV_URL+'handovers';
						console.log('POSTing to '+url);
						$http.post(url, input)
						.then(function(response) {
							console.log(response);
							window.alert('Job submitted with handover token '+response.data);
						}).catch(function (data) {
							window.alert('Could not submit job: '+data);
						});
					}
				}
			});
			$scope.refresh();
			$scope.refresh();
		};


		$scope.checkAll = function() {
			angular.forEach($scope.jobs, function(value) {
				value.Selected = $scope.selectAll;
			});
		};
    }
    	);
