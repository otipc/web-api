// var app = angular.module('Stat-Show', []);

angular.module('app').controller('getItems', function ($scope, $http) {

    // baseUrl = "http://localhost:8086";
    baseUrl = "http://192.168.49.160:8090";

    $scope.limit = 5;
    $scope.count = 0;

    $scope.current_page = 0;
    $scope.count_page = 0;

    /* data List */
    $scope.getContent = function () {
        $http.get(baseUrl + '/job/page' + '/' + $scope.current_page + '/' + $scope.limit).success(function (data) {
            $scope.items = data;
        });
    };
    /* Count */
    $scope.getCount = function () {
        $http.get(baseUrl + '/job/count').success(function (data) {
            $scope.count = data;
            $scope.count_page = Math.ceil($scope.count / $scope.limit);
        });
    };
    /* change  */
    $scope.change = function () {
        if ($scope.current_page == $scope.count_page - 1) {
            $('.next').attr("disabled", true);
            $('.last').attr("disabled", true);
        } else {
            $('.next').attr("disabled", false);
            $('.last').attr("disabled", false);
        }
        if (0 == $scope.current_page) {
            $('.first').attr("disabled", true);
            $('.prev').attr("disabled", true);
        } else {
            $('.first').attr("disabled", false);
            $('.prev').attr("disabled", false);
        }
    };

    /* Pagination */
    $scope.page = function (page) {
        $scope.current_page = page;
        $scope.getContent();
        $scope.getCount();
        $scope.change();
    };

    $scope.copy = function ($event) {
        var id = $($event.target).attr('data');
        alert("copy : " + id);
        // $http.get('/user/' + id).success(function (result) {
        //
        // });
    };

    $scope.getContent();
    $scope.getCount();
    $scope.change();


});
