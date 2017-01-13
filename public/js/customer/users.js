// var app = angular.module('Stat-Show', []);

angular.module('app').controller('getItems', function ($scope, $http) {

    baseUrl = "http://192.168.49.119:9093";
    // baseUrl = "http://127.0.0.1:18080";

    $scope.limit = 5;
    $scope.count = 0;

    $scope.current_page = 0;
    $scope.count_page = 0;

    /* data List */
    $scope.getContent = function () {
        $http.get(baseUrl + '/manage/page' + '/' + $scope.current_page + '/' + $scope.limit).success(function (data) {
            $scope.items = data;
        });
    };
    /* Count */
    $scope.getCount = function () {
        $http.get(baseUrl + '/manage/count').success(function (data) {
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


    $scope.getToken = function ($event) {
        var id = $($event.target).attr('data');
        $http.get('/user/' + id).success(function (result) {
            alert(result);
            var message = result.data.token;
            if (null == message)
                var message = "该用户没有Token!";
            bootbox.confirm({
                title: '<i class="fa fa-table"></i> Get Token',
                message: "<textarea class='form-control' rows='5' placeholder='body'>" + message + "</textarea>",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancel'
                    }
                    ,
                    confirm: {
                        label: '<i class="fa fa-check"></i> Confirm'
                    }
                }
                ,
                callback: function (result) {
                    console.log('This was logged in the callback: ' + result);
                }
            })
            ;

        }).error(function (result) {
            bootbox.confirm({
                title: '<i class="fa fa-table"></i> Get Token',
                message: "Service error!",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancel'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Confirm'
                    }
                },
                callback: function (result) {
                    console.log('This was logged in the callback: ' + result);
                }
            });
        });
    };

    $scope.refreshToken = function ($event) {
        var id = $($event.target).attr('data');
        $http.get('/user/refresh/' + id).success(function (result) {
            var message = result.data.token;
            if (null == message)
                var message = "该用户没有Token!";
            bootbox.confirm({
                title: '<i class="fa fa-table"></i> Token Refresh',
                message: "<textarea class='form-control' rows='5' placeholder='body'>" + message + "</textarea>",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancel'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Confirm'
                    }
                },
                callback: function (result) {
                    console.log('This was logged in the callback: ' + result);
                }
            });
        }).error(function (result) {
            bootbox.confirm({
                title: '<i class="fa fa-table"></i> Get Token',
                message: "Service error!",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancel'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Confirm'
                    }
                },
                callback: function (result) {
                    console.log('This was logged in the callback: ' + result);
                }
            });
        });
    };

    $scope.getContent();
    $scope.getCount();
    $scope.change();


});
