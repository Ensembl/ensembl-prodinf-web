'use strict';


/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:HandoverSubmitCtrl
 * @description
 * # HandoverSubmitCtrl
 * Controller of the ensemblProdinfserviceApp
 */

angular.module('ProdSrvApp')
    .controller('HandoverSubmitCtrl', function ($scope, $http, CONFIG, $q, $location, editjob) {
	$scope.displayOptions = false;
	$scope.jobdata = editjob.get();
	$scope.UpdateType = 'Other';
	if ($scope.jobdata!==null && $scope.jobdata !== ''){
		var serveruri=$scope.jobdata.database_uri.split('/');
		$scope.ServerUri = serveruri[0]+'/'+serveruri[1]+'/'+serveruri[2]+'/';
		$scope.dbName = serveruri[3];
		$scope.email = $scope.jobdata.email;
		$scope.UpdateType = $scope.jobdata.update_type;
		$scope.comment = $scope.jobdata.comment;
		$scope.source = $scope.jobdata.source;
	}

    $scope.getServerUris = function(query) {
	    if(query===null || query === '' || $scope.ServerUri === null || $scope.ServerUri === '') {
		  return [];
		}
	    var url = CONFIG.DB_SRV_URL+'list_servers/'+CONFIG.COPY_SOURCE_USER+'?query=' + query;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
		    console.log(res.data);
		    return res.data;
		});
	};

	$scope.getDbs = function(query) {
	    if(query===null || query === '' || $scope.ServerUri === null || $scope.ServerUri === '') {
		  return [];
		}
	    var url = CONFIG.DB_SRV_URL+'list_databases?query=' + query + '&db_uri='+$scope.ServerUri;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
			console.log(res.data);
			if ($scope.jobdata===null || $scope.jobdata === ''){
			  $scope.dbName = res.data;
			}
		    return res.data;
		});
	};

	$scope.submitMetadataJob = function() {
	    /*jshint camelcase: false */
	    $scope.jobResult = null;
	    $scope.jobId = null;

        var urlpattern = new RegExp('^(mysql:\/\/){1}'+ /* engine:// */
		'(.+){1}'+ /* user */
		'(:.+){0,1}'+ /* :password (optional) */
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
		if($scope.comment === null || $scope.comment === '') {
			window.alert('Comment required');
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
		'database_uri': $scope.ServerUri+$scope.dbName
		};		
		if (emailpattern.test($scope.email)){
			input.email = $scope.email;
		}
		else {
			window.alert('Email should follow the pattern john.doe@ebi.ac.uk');
			return;
		}
		input.metadata_uri=CONFIG.METADATA_URI;
		input.update_type=$scope.UpdateType;
		input.comment=$scope.comment;
		input.source="Handover";
	    console.log(input);
	    var url = CONFIG.METADATA_SRV_URL+'submit';
	    console.log('POSTing to '+url);
	    $http.post(url, input)
		.then(function(response) {
		    console.log(response);
		    if($scope.keepValues === true) {
		    	window.alert('Job submitted with ID '+response.data.job_id);
		    } else {
		    	$scope.jobId = response.data.job_id;
		    	$scope.database_uri = null;
				$scope.metadata_uri = null; 
				$scope.update_type = null;
				$scope.comment = null;
				$scope.source = null;
		    	$location.url('/metadata_result/'+$scope.jobId);
		    } 
		}).catch(function (data) {		  
		    window.alert('Could not submit job: '+data);
		});
	};
}
	       );
