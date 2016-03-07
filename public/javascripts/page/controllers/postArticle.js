angular.module('myApp',[]);

angular.module('myApp')
	.controller('imgCtrl', ['$scope','$http', function ($scope,$http) {
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
				data:{"article":data,"title":$scope.title},
				method:'POST'
			}).success(function(res){
				if( res.status == 0 ){
					alert('ok');
				}
			})
		}
	}])
