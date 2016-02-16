var app = angular.module('main');
app.controller('loginCtrl', ['$scope', '$state', 'localService', 'customService', function($scope, $state, localService, customService) {
    var loginController = this;
    loginController.checkStorage = function() {
        console.log("hello");
        console.log(localService.getRegisteredUsers());
        if (localService.getRegisteredUsers()) {
            loginController.pwd = localService.getRegisteredUsers().password;
            loginController.isRemembered = true;
        }
    };
    loginController.checkStorage();
    loginController.loadSignUp = function() {
        $state.go("signUp");
    };
    loginController.loadforgotPwd = function() {
        $state.go("forgotPwd");
    };
    loginController.login = function() {
        if (loginController.isRemembered) {
            //dolocalstorage
            localService.setRegisteredUsers(loginController.email, loginController.pwd);
        }
        var data = {
            "action": "loginAction",
            "authkey": "k3w0We8.qGhNb1ldzs",
            "eml": loginController.email,
            "pass": loginController.pwd
        };
        var dataOne = {
            "action": "loginAction",
            "authkey": "k3w0We8.qGhNb1ldzs",
            "eml": "sunukamal.sparks@gmail.com",
            "pass": "poc123"
        };
        customService.postCall($scope, "loginSuccess", "loginError", 'http://103.230.84.14/userservice.php', data);
        customService.postCall($scope, "loginSuccessOne", "loginErrorOne", 'http://103.230.84.14/userservice.php', dataOne);
        // http.post('http://103.230.84.14/userservice.php', data).then(function(data) {
        //     console.log(data);
        // }, function(error) {
        //     console.log(error);
        // });
        $scope.loginSuccess = function(successData) {
            console.log(successData);
        };
        $scope.loginError = function(errorData) {
            console.log(errorData);
        };
        $scope.loginSuccessOne = function(successData) {
            console.log(successData);
        };
        $scope.loginErrorOne = function(errorData) {
            console.log(errorData);
        };

    };
    loginController.loadMenu = function() {
        $state.go("leftMenu.first");
    };
}]);
app.controller('signUpCtrl', ['$scope', '$http', function(scope, http) {
    var signUpController = this;
    scope.validCPwd = false;
    scope.$watchGroup(['pwd', 'cpwd'], function(newValue, oldValue) {
        if (newValue[0] !== undefined && newValue[1] !== undefined) {
            if (newValue[0] === newValue[1]) {
                scope.validCPwd = false;
            } else {
                scope.validCPwd = true;
            }
        }
    });
    signUpController.signUpClicked = function() {
        var data = {
            "action": "insertAction",
            "authkey": "k3w0We8.qGhNb1ldzs",
            "eml": scope.email,
            "fname": scope.fname,
            "lname": scope.lname,
            "pass": scope.pwd
        };
        http.post('http://103.230.84.14/userservice.php', data).then(function(data) {
            console.log(data);
        }, function(error) {
            console.log(error);
        });
    };
}]);
app.controller('menuCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.loadFirstMenu = function() {
        $state.go("leftMenu.first");
    };
    $scope.loadSecondMenu = function() {
        $state.go("leftMenu.second");
    };
}]);
