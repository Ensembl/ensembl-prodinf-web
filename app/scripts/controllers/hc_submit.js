'use strict';


/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:HCSubmitCtrl
 * @description
 * # HCSubmitCtrl
 * Controller of the ensemblProdinfserviceApp
 */

angular.module('ProdSrvApp')
    .controller('HCSubmitCtrl', function ($scope, $http, CONFIG, $q, $location,editjob) {
	$scope.jobdata = editjob.get();
	if ($scope.jobdata===null || $scope.jobdata === ''){
		$scope.staging_uri = CONFIG.STAGING_URI;
		$scope.production_uri = CONFIG.PROD_URI;
		$scope.compara_uri = CONFIG.COMPARA_URI;
		$scope.live_uri = CONFIG.LIVE_URI;
		$scope.data_files_path = CONFIG.DATA_FILES_PATH;
	}
	else{
		var uri=$scope.jobdata.db_uri.split('/');
		$scope.dbUri = uri[0]+'/'+uri[1]+'/'+uri[2]+'/';
		$scope.dbName = uri[3];
		$scope.hcNames = $scope.jobdata.hc_names;
		$scope.hcGroups = $scope.jobdata.hc_groups;
		$scope.data_files_path = $scope.jobdata.data_files_path;
		$scope.email = $scope.jobdata.email;
		$scope.staging_uri = $scope.jobdata.staging_uri;
		$scope.production_uri = $scope.jobdata.production_uri;
		$scope.compara_uri = $scope.jobdata.compara_uri;
		$scope.live_uri = $scope.jobdata.live_uri;
		$scope.tag = $scope.jobdata.tag;
	}

	$scope.getUris = function(query) {
	    if(query===null || query === '' || $scope.dbUri === null || $scope.dbUri === '') {
		return [];
	    }
	    var url = CONFIG.DB_SRV_URL+'servers/'+CONFIG.URI_USER+'?query=' + query;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
		    console.log(res.data);
		    return res.data;
		});
	};

	$scope.getDbs = function(query) {
	    if(query===null || query === '' || $scope.dbUri === null || $scope.dbUri === '') {
		return [];
	    }
	    var url = CONFIG.DB_SRV_URL+'databases?query=' + query + '&db_uri='+$scope.dbUri;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
		    console.log(res.data);
		    return res.data;
		});
	};

	$scope.getHcNames = function(query) {
	    var url = CONFIG.HC_SRV_URL+'hclist?query=' + query;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
		    console.log(res.data);
		    return res.data;
		});
	};

	$scope.getHcGroups = function(query) {
	    var url = CONFIG.HC_SRV_URL+'hcgroups?query=' + query;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
		    console.log(res.data);
			return res.data;
		});
    };

	$scope.submitJob = function() {
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

		var dburlpattern = new RegExp('^(mysql:\/\/){1}'+ /* engine:// */
		'(.+){1}'+ /* user */
		'(:.+){0,1}'+ /* :password (optional) */
		'(@){1}'+ /* @ */
		'(.+){1}'+ /* server_name */
		'(:){1}'+ /* : */
		'(\\d+){1}'+ /* port */
		'(\/){1}'+ /* end_of_url/ */
		'(.+){1}$'); /* database_name */

		var emailpattern = new RegExp('^(.+){1}(@){1}(.+){1}');
	    
	    if($scope.dbUri === null || $scope.dbUri === '') {
			window.alert('DB URI required');
			return;
		}
		if (!urlpattern.test($scope.dbUri)){
			window.alert('DB URI should follow this pattern  mysql://user(:pass)@server:port/ ');
			return;
		}
	    if($scope.dbName === null || $scope.dbName === '') {
		    window.alert('DB name required');
			return;
	    }
	    var input = {
		'db_uri': $scope.dbUri+$scope.dbName
	    };

	    if($scope.staging_uri!==null && $scope.staging_uri!=='') {
			input.staging_uri = $scope.staging_uri;
		}
		if (!urlpattern.test($scope.staging_uri)){
			window.alert('Staging URI should follow this pattern  mysql://user(:pass)@server:port/ ');
			return;
		}
	    if($scope.live_uri!==null && $scope.live_uri!=='') {
			input.live_uri = $scope.live_uri;
		}
		if (!urlpattern.test($scope.live_uri)){
			window.alert('Live URI should follow this pattern  mysql://user(:pass)@server:port/ ');
			return;
		}
	    if($scope.production_uri!==null && $scope.production_uri!=='') {
	    	input.production_uri = $scope.production_uri;
		}
		if (!dburlpattern.test($scope.production_uri)){
			window.alert('Production URI should follow this pattern  mysql://user(:pass)@server:port/prod_db_name ');
			return;
		}
	    if($scope.compara_uri!==null && $scope.compara_uri!=='') {
	    	input.compara_uri = $scope.compara_uri;
		}
		if (!dburlpattern.test($scope.compara_uri)){
			window.alert('Compara URI should follow this pattern  mysql://user(:pass)@server:port/compara_db_name ');
			return;
		}  
	    
	    if($scope.hcNames!==null) {
	    	input.hc_names = $scope.hcNames;
	    }
	    if($scope.hcGroups!==null) {
	    	input.hc_groups = $scope.hcGroups;
		}
	    if($scope.data_files_path!==null && $scope.data_files_path!=='') {
			input.data_files_path = $scope.data_files_path;
		}
		if($scope.tag!==null) {
			input.tag = $scope.tag;
		}
	    if($scope.email!==null && $scope.email!==undefined) {
			if (emailpattern.test($scope.email)){
				input.email = $scope.email;
			}
			else {
				window.alert('Email should follow the pattern john.doe@ebi.ac.uk');
				return;
			}
		}
	    if((input.hc_names === null || input.hc_names === undefined || input.hc_names.length===0) && 
	    	(input.hc_groups === null || input.hc_groups === undefined || input.hc_groups.length===0)) {
		window.alert('Either HC names or groups names are required');
	    return;
	    }	
	    console.log(input);
	    var url = CONFIG.HC_SRV_URL+'jobs';
	    console.log('POSTing to '+url);
	    $http.post(url, input)
		.then(function(response) {
		    console.log(response);
		    if($scope.keepValues === true) {
		    	window.alert('Job submitted with ID '+response.data.job_id);
		    } else {
		    	$scope.jobId = response.data.job_id;
		    	$scope.dbUri = null;
		    	$scope.dbName = null;
		    	$scope.hcNames = null;
				$scope.hcGroups = null;
				$scope.tag = null;
		    	$location.url('/hc_result/'+$scope.jobId);
		    } 
		}).catch(function (data) {		  
		    window.alert('Could not submit job: '+data);
		});
	};
    }
	       );
