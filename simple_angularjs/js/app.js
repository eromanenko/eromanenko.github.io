var myApp = angular.module("myApp", []);
  myApp.controller("CtrlOne", function (
    $scope,
    $timeout,
    $interval,
    $http
  ) {
    $scope.name = "Stanislav";
    $scope.timer;
    $scope.imgsrc;

    $scope.buttonOnClick = function() {
      alert('A-ha')
    }

    $scope.startPulling = function() {
      console.log('start');
      $scope.timer = $interval(function() {
        console.log('process');
        const random = Math.floor(Math.random() * Math.floor(100));
        $http.get(`https://jsonplaceholder.typicode.com/photos/${random}`)
        .then(function(result) {
          if (result && result.data && result.data.thumbnailUrl) {
            $scope.imgsrc = result.data.thumbnailUrl;
          }
        })
      }, 1000)
    }

    $scope.stopPulling = function() {
      console.log('stop')
      $interval.cancel($scope.timer)
    }
});