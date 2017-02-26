'use strict';

/* Controllers */

var gamesControllers = angular.module('gamesControllers', []);

gamesControllers.controller('GameListCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('database/games_data.json').success(function(data) {
        $scope.games = data;
    });
	
	$scope.autosearch = function (row) {
		var lowerQuery = angular.lowercase($scope.query)
        return (angular.lowercase(row.ruName).indexOf(lowerQuery || '') !== -1 || angular.lowercase(row.enName).indexOf(lowerQuery || '') !== -1);
    };
	
    $scope.view = 'list';
	$scope.sortType = 'ruName';
	$scope.sortReverse = false; 
}]);

gamesControllers.controller('GameDetailCtrl', ['$scope', '$sce', '$routeParams', '$http', function($scope, $sce, $routeParams, $http) {
	
	$scope.renderHtml = function(html_code) {
		return $sce.trustAsHtml(html_code);
	};
	
	$scope.afterLoadData = function(data) {
		$scope.game = data;
		$scope.description = $scope.renderHtml(data.description);
		$scope.mainImageUrl = (data.imgs && data.imgs.length) ? data.imgs[0] : data.img;
	};
	
	$scope.setImage = function(imageUrl) {
		$scope.mainImageUrl = imageUrl;
	}

	$http.get('database/' + $routeParams.gameId + '.json').success(function(data) {
		$scope.afterLoadData(data);
    }).error(function(data) {
		var game = {};
		$http.get('database/games_data.json').success(function(data) {
			angular.forEach(data, function(value, key) {
				//angular.forEach hasn't 'break'
				if (! game.id) {
					if (value.id === $routeParams.gameId) {
						  game = data[key];
					  }
				}
			});
			$scope.afterLoadData(game);
		})
	});
	

}]);