'use strict';

var app = angular.module('gameCat', [
  'ngRoute',
  'gamesControllers'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/games', {
        templateUrl: 'partials/game-list.html',
        controller: 'GameListCtrl'
      }).
      when('/games/:gameId', {
        templateUrl: 'partials/game-detail.html',
        controller: 'GameDetailCtrl'
      }).
      otherwise({
        redirectTo: '/games'
      });
}]);

app.directive('glGameCard', function(){
    return {
        restrict: 'E',
        scope: {
            game: '='
        },
        templateUrl: 'partials/game-card.html'
    };
});