// var app = angular.module('Stat-Show', []);

angular.module('app').controller('getItems', function ($scope, $http) {

    // baseUrl = "http://localhost:18080";
    baseUrl = "http://192.168.49.119:9090";

    /* data List */
    $scope.getContent = function () {
        $http.get(baseUrl + '/config/show').success(function (data) {
            $scope.items = data;
        }).error(function () {
            alert("Load data error! Please refresh then.")
        });
    };

    $scope.getContent();

});
