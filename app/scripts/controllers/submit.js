'use strict';


/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:SubmitCtrl
 * @description
 * # MainCtrl
 * Controller of the ensemblProdinfHcserviceApp
 */

angular.module('hcSrvApp')
    .controller('SubmitCtrl', function ($scope, $http, CONFIG, $q, $location,editjob) {
	$scope.jobdata = editjob.get();
	if ($scope.jobdata===null || $scope.jobdata === ''){
		$scope.staging_uri = CONFIG.STAGING_URI;
		$scope.production_uri = CONFIG.PROD_URI;
		$scope.compara_uri = CONFIG.COMPARA_URI;
		$scope.live_uri = CONFIG.LIVE_URI;
	}
	else{
		var uri=$scope.jobdata.db_uri.split('/');
		$scope.dbUri = uri[0]+'/'+uri[1]+'/'+uri[2]+'/';
		$scope.dbName = uri[3];
		$scope.hcNames = $scope.jobdata.hc_names;
		$scope.hcGroups = $scope.jobdata.hc_groups;
		$scope.email = $scope.jobdata.email;
		$scope.staging_uri = $scope.jobdata.staging_uri;
		$scope.production_uri = $scope.jobdata.production_uri;
		$scope.compara_uri = $scope.jobdata.compara_uri;
		$scope.live_uri = $scope.jobdata.live_uri;
	}

	$scope.getUris = function(query) {
	    if(query===null || query === '' || $scope.dbUri === null || $scope.dbUri === '') {
		return [];
	    }
	    var url = CONFIG.DB_SRV_URL+'list_servers/'+CONFIG.URI_USER+'?query=' + query;
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
	    var url = CONFIG.DB_SRV_URL+'list_databases?query=' + query + '&db_uri='+$scope.dbUri;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
		    console.log(res.data);
		    return res.data;
		});
	};

	$scope.loadHcNames = function(query, url) {
	    var lQuery = query.toLowerCase();
	    var d = $q.defer();
	    $http.get(url).then(function (response) {
		d.resolve(response.data.filter(function(name) {
		    return name.toLowerCase().indexOf(lQuery)!==-1;
		}));
	    }
	    ).catch(function(data) {
		window.alert('Could not look up database names: '+data);
	    });
	    return d.promise;
	};

	$scope.submitJob = function() {
	    /*jshint camelcase: false */
	    $scope.jobResult = null;
	    $scope.jobId = null;
	    
	    if($scope.dbUri === null || $scope.dbUri === '') {
		window.alert('DB URI required');
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
	    if($scope.live_uri!==null && $scope.live_uri!=='') {
		input.live_uri = $scope.live_uri;
	    }
	    if($scope.production_uri!==null && $scope.production_uri!=='') {
	    	input.production_uri = $scope.production_uri;
	    }
	    if($scope.compara_uri!==null && $scope.compara_uri!=='') {
	    	input.compara_uri = $scope.compara_uri;
	    }	   
	    
	    if($scope.hcNames!==null) {
	    	input.hc_names = $scope.hcNames;
	    }
	    if($scope.hcGroups!==null) {
	    	input.hc_groups = $scope.hcGroups;
	    }
	    if($scope.email!==null && $scope.email!=='') {
		input.email = $scope.email;
	    }
	    if((input.hc_names === null || input.hc_names === undefined || input.hc_names.length===0) && 
	    		(input.hc_groups === null || input.hc_groups === undefined || input.hc_groups.length===0)) {
		window.alert('Either HC names or groups names are required');
	    return;
	    }	
	    console.log(input);
	    var url = CONFIG.HC_SRV_URL+'submit';
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
		    	$location.url('/view/'+$scope.jobId);
		    } 
		}).catch(function (data) {		  
		    window.alert('Could not submit job: '+data);
		});
	};
    }
	       );
