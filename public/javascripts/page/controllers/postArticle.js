angular.module('myApp',[]);

angular.module('myApp')
	.controller('imgCtrl', ['$scope','$http','$location', function ($scope,$http,$location) {
		$http({
			url:'/admin/getAllImgs',
			method:'GET'
		}).success(function(res){
			if( res.status == 0 ){
				$scope.imgLists = res.body;
			}
		});
		$scope.submit = function(){
			var data = editor.codemirror.getValue();
			$http({
				url:'/admin/postArticle',
				data:{"article":data,"title":$scope.title,"tag":$scope.tag},
				method:'POST'
			}).success(function(res){
				if( res.status == 0 ){
					alert('发表文章成功!');
					 $scope.title = '';
					 $scope.tag = '';
				}
			})
		}
	}])
