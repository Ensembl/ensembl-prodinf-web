'use strict';


/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:CopyCtrl
 * @description
 * # MainCtrl
 * Controller of the ensemblProdinfHcserviceApp
 */

angular.module('hcSrvApp')
    .controller('CopyCtrl', function ($scope, $http, CONFIG, $q, $location, editjob) {
	$scope.displayOptions = false;
	$scope.jobdata = editjob.get();
	if ($scope.jobdata!==null && $scope.jobdata !== ''){
		var sourceuri=$scope.jobdata.source_db_uri.split('/');
		$scope.SourcedbUri = sourceuri[0]+'/'+sourceuri[1]+'/'+sourceuri[2]+'/';
		$scope.SourcedbName = sourceuri[3];
		var targeturi=$scope.jobdata.target_db_uri.split('/');
		$scope.TargetdbUri = targeturi[0]+'/'+targeturi[1]+'/'+targeturi[2]+'/';
		$scope.TargetdbName = targeturi[3];
        $scope.only_tables = $scope.jobdata.only_tables;
        $scope.skip_tables = $scope.jobdata.skip_tables;
        $scope.update = $scope.jobdata.update;
        $scope.drop = $scope.jobdata.drop;
        $scope.email = $scope.jobdata.email;
	}

    $scope.getSourceCopyUris = function(query) {
	    if(query===null || query === '' || $scope.SourcedbUri === null || $scope.SourcedbUri === '') {
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

	$scope.getSourceCopyDbs = function(query) {
	    if(query===null || query === '' || $scope.SourcedbUri === null || $scope.SourcedbUri === '') {
		  return [];
	    }
	    var url = CONFIG.DB_SRV_URL+'list_databases?query=' + query + '&db_uri='+$scope.SourcedbUri;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
			console.log(res.data);
			if ($scope.jobdata===null || $scope.jobdata === ''){
			  $scope.TargetdbName = res.data;
			}
		    return res.data;
		});
	};

	$scope.getTargetCopyUris = function(query) {
	    if(query===null || query === '' || $scope.TargetdbUri === null || $scope.TargetdbUri === '') {
		  return [];
	    }
	    var url = CONFIG.DB_SRV_URL+'list_servers/'+CONFIG.COPY_TARGET_USER+'?query=' + query;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
		    console.log(res.data);
		    return res.data;
		});
	};

	$scope.getTargetCopyDbs = function(query) {
	    if(query===null || query === '' || $scope.TargetdbUri === null || $scope.TargetdbUri === '') {
		  return [];
	    }
	    var url = CONFIG.DB_SRV_URL+'list_databases?query=' + query + '&db_uri='+$scope.TargetdbUri;
	    console.log(url);
	    return $http.get(url)
		.then(function(res) {
		    console.log(res.data);
		    return res.data;
		});
	};


    $scope.displayAdvOptions = function() {
        $scope.displayOptions = !$scope.displayOptions;
    };


	$scope.submitCopyJob = function() {
	    /*jshint camelcase: false */
	    $scope.jobResult = null;
	    $scope.jobId = null;
	    
	    if($scope.SourcedbUri === null || $scope.SourcedbUri === '') {
		window.alert('Source DB URI required');
		return;
	    }
	    if($scope.TargetdbUri === null || $scope.TargetdbUri === '') {
		window.alert('Target DB URI required');
		return;
	    }
	    if($scope.SourcedbName === null || $scope.SourcedbName === '') {
		window.alert('Source DB name required');
		return;
	    }
	    if($scope.TargetdbName === null || $scope.TargetdbName === '') {
		window.alert('Target DB name required');
		return;
	    }
	    var input = {
		'source_db_uri': $scope.SourcedbUri+$scope.SourcedbName
	    };

	    input.target_db_uri = $scope.TargetdbUri+$scope.TargetdbName;

	    if($scope.only_tables!==null && $scope.only_tables!=='') {
		input.only_tables = $scope.only_tables;
	    }
	    if($scope.skip_tables!==null && $scope.skip_tables!=='') {
		input.skip_tables = $scope.skip_tables;
	    }
	    if($scope.update!==null && $scope.update!=='') {
		input.update = $scope.update;
	    }
	    if($scope.drop!==null && $scope.drop!=='') {
		input.drop = $scope.drop;
	    }
	    if($scope.email!==null && $scope.email!=='') {
		input.email = $scope.email;
	    }
	    console.log(input);
	    var url = CONFIG.DB_SRV_URL+'submit';
	    console.log('POSTing to '+url);
	    $http.post(url, input)
		.then(function(response) {
		    console.log(response);
		    if($scope.keepValues === true) {
		    	window.alert('Job submitted with ID '+response.data.job_id);
		    } else {
		    	$scope.jobId = response.data.job_id;
		    	$scope.source_db_uri = null;
		    	$scope.target_db_uri = null;
		    	$location.url('/copyview/'+$scope.jobId);
		    } 
		}).catch(function (data) {		  
		    window.alert('Could not submit job: '+data);
		});
	};
    }
	       );
