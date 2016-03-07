angular.module('myApp',[]);

angular.module('myApp')
	.controller('codingCtrl', ['$scope','$http', function ($scope,$http) {
		$http({
			url:'/getCodingArticle',
			method:'GET'
		}).success(function(res){
			if( res.status == 0 ){
				$scope.codingAtrLists = res.body;
			}
		})
	}])
