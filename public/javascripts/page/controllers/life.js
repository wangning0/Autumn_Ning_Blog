angular.module('myApp',[]);

angular.modele('myApp')
	.controller('lifeCtrl', ['$scope','$http', function ($scope,$http) {
		$http({
			url:'/getLifeArticle',
			method:'GET'
		}).success(function(res){
			if( res.status == 0 ){
				$scope.lifeArticles = res.body;
			}
		})
	}])
