app.controller('mainController', ['$scope', '$http', function($scope, $http) {

    // fill list on load
    $http.get('/users/')
        .success(function (data) {
            $scope.userList = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // add user
    $scope.addUser = function() {
        $http.post('/users/', $scope.formData)
            .success(function(data) {

                $scope.formData = {};
                $scope.userList = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete user
    $scope.deleteUser = function(id) {
        $http.delete('/users/' + id)
            .success(function(data) {
                $scope.userList = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}]);
