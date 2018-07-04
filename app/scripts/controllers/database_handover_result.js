'use strict';

/**
 * @ngdoc function
 * @name ensemblProdinfserviceApp.controller:HandoverResultCtrl
 * @description # HandoverResultCtrl Controller of the ensemblProdinfserviceApp
 */


angular.module('ProdSrvApp')
    .controller('HandoverResultCtrl', function ($scope, $http, $routeParams, CONFIG, $location, editjob) {
	$scope.running = false;
	$scope.getHandoverResult = function() {
	    $scope.jobResult = null;	    
	    if($scope.handoverToken !== null && $scope.handoverToken !== undefined) {
			var url = CONFIG.HANDOVER_SRV_URL+'handovers/'+$scope.handoverToken;
			$scope.running = true;
			$http.get(url)
				.then(function(response) {
				$scope.jobResult = response.data;
				$scope.running = false;
			});
	    }
	};
	
	$scope.deleteHandoverJob = function() {
	    if($scope.handoverToken !== null && $scope.handoverToken !== undefined) {
			var url = CONFIG.HANDOVER_SRV_URL+'handovers/'+$scope.handoverToken;
			$scope.running = true;
			$http.delete(url)
			.then(function() {
				$scope.jobResult = null;	  
				$scope.handoverToken = null;
				$scope.running = false;
			}).catch(function (data) {	
			console.log(data);
			window.alert('Could not delete job');
			});
	    }
	};

	$scope.EditReSubmitJob = function() {
		editjob.set($scope.jobResult[0]);		
	    $location.url('/database_handover_submit');
	};
	
    $scope.refresh = function() {
	        $scope.getHandoverResult();
    };

	if($routeParams.handoverTokenParam !== null && $routeParams.handoverTokenParam !== undefined) {
	    console.log($routeParams.handoverTokenParam);
	    $scope.handoverToken = $routeParams.handoverTokenParam;
	    $scope.getHandoverResult();
	}

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

   $scope.urlify = function(text) {
	    var url = new RegExp('(.+)http://(.+)');
		var urlRegex = /(https?:\/\/[^\s]+)/g;
		if (url.test(text)){
		    var fixedUrl = text.replace('http://127.0.0.1',$location.$$protocol+ '://' + $location.$$host);
            return fixedUrl.replace(urlRegex, function(url) {
                return '<a href="' + url + '">' + url + '</a>';
		    });
		}
		else {
			return(text);
		}
   };
}
);
