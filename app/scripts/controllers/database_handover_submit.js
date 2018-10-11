'use strict';


/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:HandoverSubmitCtrl
 * @description
 * # HandoverSubmitCtrl
 * Controller of the ensemblProdinfserviceApp
 */

angular.module('ProdSrvApp')
    .controller('HandoverSubmitCtrl', function ($scope, $http, CONFIG, $q, $location, editjob, hidepassword) {
	$scope.displayOptions = false;
	$scope.hidePassword = function(data) {
		return hidepassword.hide(data);
	};
	$scope.jobdata = editjob.get();
	$scope.UpdateType = 'Other';
	if ($scope.jobdata!==null && $scope.jobdata !== ''){
		var serveruri=$scope.jobdata.src_uri.split('/');
		$scope.ServerUri = serveruri[0]+'/'+serveruri[1]+'/'+serveruri[2]+'/';
		$scope.dbName = serveruri[3];
		$scope.email = $scope.jobdata.contact;
		$scope.UpdateType = $scope.jobdata.type;
		$scope.description = $scope.jobdata.comment;
		$scope.source = $scope.jobdata.source;
	}

    $scope.getServerUris = function(query) {
	    if(query===null || query === '' || $scope.ServerUri === null || $scope.ServerUri === '') {
		  return [];
		}
	    var url = CONFIG.DB_SRV_URL+'servers/'+CONFIG.COPY_SOURCE_USER+'?query=' + query;
	    return $http.get(url)
		.then(function(res) {
		    return res.data;
		});
	};

	$scope.getDbs = function(query) {
	    if(query===null || query === '' || $scope.ServerUri === null || $scope.ServerUri === '') {
		  return [];
		}
	    var url = CONFIG.DB_SRV_URL+'databases?query=' + query + '&db_uri='+$scope.ServerUri;
	    return $http.get(url)
		.then(function(res) {
		    return res.data;
		});
	};

	$scope.submitDatabaseHandoverJob = function() {
	    /*jshint camelcase: false */
	    $scope.jobResult = null;
	    $scope.jobId = null;

        var urlpattern = new RegExp('^(mysql:\/\/){1}'+ /* engine:// */
		'(\\w+){1}'+ /* user */
		'(:)?'+ /* : (optional) */
		'(.+)?'+ /* password (optional) */
		'(@){1}'+ /* @ */
		'(.+){1}'+ /* server_name */
		'(:){1}'+ /* : */
		'(\\d+){1}'+ /* port */
		'(\/){1}$'); /* end_of_url/ */

		var emailpattern = new RegExp('^(.+){1}(@){1}(.+){1}');

	    if($scope.ServerUri === null || $scope.ServerUri === '') {
			window.alert('Server URI required');
			return;
		}
		if($scope.email === null || $scope.email === '') {
			window.alert('Email required');
			return;
		}
		if($scope.UpdateType === null || $scope.UpdateType === '') {
			window.alert('Update type required');
			return;
		}
		if($scope.description === null || $scope.description === '') {
			window.alert('Description required');
			return;
		}
		if (!urlpattern.test($scope.ServerUri)){
			window.alert('Server URI should follow this pattern  mysql://user(:pass)@server:port/ ');
			return;
		}
	    if($scope.dbName === null || $scope.dbName === '') {
			window.alert('DB name required');
			return;
		}
	    var input = {
		'src_uri': $scope.ServerUri+$scope.dbName
		};		
		if (emailpattern.test($scope.email)){
			input.contact = $scope.email;
		}
		else {
			window.alert('Email should follow the pattern john.doe@ebi.ac.uk');
			return;
		}
		input.type=$scope.UpdateType;
		input.comment=$scope.description;
		input.source='Handover';
	    var url = CONFIG.HANDOVER_SRV_URL+'handovers';
	    $http.post(url, input)
		.then(function(response) {
		    if($scope.keepValues === true) {
		    	window.alert('Job submitted with handover token '+response.data);
		    } else {
		    	$scope.handover_token = response.data;
				$scope.src_uri = null;
				$scope.contact = null;
				$scope.update_type = null;
				$scope.description = null;
				$scope.source = null;
		    	$location.url('/database_handover_result/'+$scope.handover_token);
		    } 
		},function (response) {
			window.alert('Handover failed: '+response.data.error);
			console.log(response);
		});
	};
}
	       );
