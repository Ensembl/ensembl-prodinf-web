'use strict';


/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:CopySubmitCtrl
 * @description
 * # CopySubmitCtrl
 * Controller of the ensemblProdinfserviceApp
 */

angular.module('ProdSrvApp')
    .controller('CopySubmitCtrl', function ($scope, $http, CONFIG, $location, editjob, hidepassword) {
	$scope.displayOptions = false;
	$scope.hidePassword = function(data) {
		return hidepassword.hide(data);
	};
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
				$scope.convert_innodb = $scope.jobdata.convert_innodb;
        $scope.email = $scope.jobdata.email;
	}

    $scope.getSourceCopyUris = function(query) {
	    if(query===null || query === '' || $scope.SourcedbUri === null || $scope.SourcedbUri === '') {
		  return [];
		}
	    var url = CONFIG.DB_SRV_URL+'servers/'+CONFIG.COPY_SOURCE_USER+'?query=' + query;
	    return $http.get(url)
		.then(function(res) {
		    return res.data;
		});
	};

	$scope.getSourceCopyDbs = function(query) {
	    if(query===null || query === '' || $scope.SourcedbUri === null || $scope.SourcedbUri === '') {
		  return [];
		}
	    var url = CONFIG.DB_SRV_URL+'databases?query=' + query + '&db_uri='+$scope.SourcedbUri;
	    return $http.get(url)
		.then(function(res) {
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
	    var url = CONFIG.DB_SRV_URL+'servers/'+CONFIG.COPY_TARGET_USER+'?query=' + query;
	    return $http.get(url)
		.then(function(res) {
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

	    if($scope.SourcedbUri === null || $scope.SourcedbUri === '') {
			window.alert('Source DB URI required');
			return;
		}
		if (!urlpattern.test($scope.SourcedbUri)){
			window.alert('Source URI should follow this pattern  mysql://user(:pass)@server:port/ ');
			return;
		}
	    if($scope.TargetdbUri === null || $scope.TargetdbUri === '') {
			window.alert('Target DB URI required');
			return;
		}
		if (!urlpattern.test($scope.TargetdbUri)){
			window.alert('Target URI should follow this pattern mysql://user:pass@server:port/ ');
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
			if (new RegExp('^([^ ]+){1}$').test($scope.only_tables) || new RegExp('^([^ ]+){1}(,){1}([^ ]+){1}$').test($scope.only_tables))
			{
			  input.only_tables = $scope.only_tables;
			}
			else{
				window.alert('List of tables need to be comma separated, eg: table1,table2,table3');
				return;
			}
	    }
	    if($scope.skip_tables!==null && $scope.skip_tables!=='') {
			if (new RegExp('^([^ ]+){1}$').test($scope.skip_tables) || new RegExp('^([^ ]+){1}(,){1}([^ ]+){1}$').test($scope.skip_tables))
			{
			  input.skip_tables = $scope.skip_tables;
			}
			else{
				window.alert('List of tables need to be comma separated, eg: table1,table2,table3');
				return;
			}
	    }
	    if($scope.update!==null && $scope.update!=='') {
			input.update = $scope.update;
	    }
	    if($scope.drop!==null && $scope.drop!=='') {
			input.drop = $scope.drop;
			}
			if($scope.convert_innodb!==null && $scope.convert_innodb!=='') {
				input.convert_innodb = $scope.convert_innodb;
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
		input.result_url = $location.$$protocol+ '://' + $location.$$host +':'+$location.$$port + '/#!/copy_result/';
	    var url = CONFIG.DB_SRV_URL+'jobs';
	    $http.post(url, input)
		.then(function(response) {
		    if($scope.keepValues === true) {
		    	window.alert('Job submitted with ID '+response.data.job_id);
		    } else {
		    	$scope.jobId = response.data.job_id;
		    	$scope.source_db_uri = null;
				$scope.target_db_uri = null;
				$location.url('/copy_result/'+$scope.jobId);
		    } 
		},function (response) {
			window.alert('Could not submit job: '+response.data.error);
			console.log(response);
			$scope.running = false;
		});
	};
}
	       );
