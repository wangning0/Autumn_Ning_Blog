angular.module('myApp',[]);

angular.module('myApp')
	.controller('blogCtrl', ['$scope','$http', function ($scope,$http) {
		$http({
			url:'/getBlog',
			method:'GET'
		}).success(function(res){
			if( res.status == 0 ){
				$scope.blogLists = res.body;
			}
		})
	}])
