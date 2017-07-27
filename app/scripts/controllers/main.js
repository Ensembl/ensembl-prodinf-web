'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfHcserviceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ensemblProdinfHcserviceApp
 */


angular.module('hcSrvApp',['app.config','ngTagsInput'])
    .controller('MainCtrl', function ($scope, $http, CONFIG, $q) {
	$scope.staging_uri = CONFIG.STAGING_URI;
	$scope.production_uri = CONFIG.PROD_URI;
	$scope.compara_uri = CONFIG.COMPARA_URI;
	$scope.live_uri = CONFIG.LIVE_URI;

	$scope.loadHcNames = function(query, url) {
	    var lQuery = query.toLowerCase();
	    var d = $q.defer();
	    $http.get(url).then(function (response) {
		d.resolve(response.data.filter(function(name) {
		    return name.toLowerCase().indexOf(lQuery)!=-1;
		}));
	    }
	    ).catch(function(data) {
		d.reject(data);
	    });
	    return d.promise;
	};

	$scope.getResult = function() {
	    $scope.jobResult = null
	    $scope.showCreate = false
	    var url = "http://ens-prod-1.ebi.ac.uk:5000/results/"+$scope.jobId
	    $http.get(url)
		.then(function(response) {
		    $scope.jobResult = response.data
		}).catch(function (data) {		  
		    alert("Could not get result for job") 
		});
	};
	$scope.submitJob = function() {
	    $scope.jobResult = null
	    $scope.jobId = null
	    
	    if($scope.db_uri == null || $scope.db_uri == '') {
		alert("DB URI required")
		return
	    }
	    var input = {
		"db_uri": $scope.db_uri
	    };

	    if($scope.staging_uri!=null && $scope.staging_uri!='') {
		input.staging_uri = $scope.staging_uri;
	    }
	    if($scope.live_uri!=null && $scope.live_uri!='') {
		input.live_uri = $scope.live_uri;
	    }
	    if($scope.production_uri!=null && $scope.production_uri!='') {
		input.production_uri = $scope.production_uri;
	    }
	    if($scope.compara_uri!=null && $scope.compara_uri!='') {
		input.compara_uri = $scope.compara_uri;
	    }	   
	    
	    if($scope.hc_names!=null) {
		input.hc_names = $scope.hc_names;
	    }
	    if($scope.hc_groups!=null) {
		input.hc_groups = $scope.hc_groups;
	    }
	    if((input.hc_names == null || input.hc_names.length==0) && (input.hc_groups ==null || input.hc_groups.length==0)) {
		alert("Either HC names or groups names are required")
	    }	
	    console.log(input)
	    var url = "http://ens-prod-1.ebi.ac.uk:5000/submit"
	    console.log("POSTing to "+url)
	    $http.post(url, input)
		.then(function(response) {
		    console.log(response)
		    $scope.jobId = response.data.job_id
		    $scope.db_uri = null
		    $scope.hc_names = null
		    $scope.hc_groups = null
		    $scope.getResult()
		    $('.nav-tabs a[href="#view"]').tab('show')
		}).catch(function (data) {		  
		    alert("Could not submit job") 
		});
	}
    }
	       );
