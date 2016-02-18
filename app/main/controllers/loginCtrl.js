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

app.controller('menuCtrl', ['$scope', '$state','$ionicSideMenuDelegate', function($scope, $state,$ionicSideMenuDelegate) {
    $scope.loadFirstMenu = function() {
        $state.go("leftMenu.first");
    };
    $scope.swipedMenu=function(event){
        console.log("swi");
    };
    $scope.loadSecondMenu = function() {
        $state.go("leftMenu.second");
    };
     $scope.loadThirdMenu = function() {
        $state.go("leftMenu.third");
    };
}]);
app.controller('detailsCtrl', ['$scope', '$state','$ionicSlideBoxDelegate', function($scope, $state, $ionicSlideBoxDelegate) {
  $scope.ItemDetails = [{
        'imageUrl' : 'main/assets/images/1.jpg'
    }, {
        'imageUrl' : 'main/assets/images/2.jpg'
    }, {
        'imageUrl' : 'main/assets/images/3.jpg'
    }, {
        'imageUrl' : 'main/assets/images/4.jpg'
    }, {
        'imageUrl' : 'main/assets/images/5.jpg'
    }, {
        'imageUrl' : 'main/assets/images/6.jpg'
    }, {
        'imageUrl' : 'main/assets/images/7.jpg'
    }, {
        'imageUrl' : 'main/assets/images/8.jpg'
    }, {
        'imageUrl' : 'main/assets/images/9.jpg'
    }, {
        'imageUrl' : 'main/assets/images/10.jpg'
    }];
 
   
}]);
app.controller("ExampleController", ['$scope','$state',function($scope,$state) {
    $scope.images = [];
    $scope.loadImages = function() {
        for (var i = 0; i < 11; i++) {
            $scope.images.push({ id: i, src: "http://placehold.it/150x150" });
        }
    };
    $scope.gotoDetails=function(evt,obj){
    	console.log(obj);
    	 $state.go("details");
    };
}]);
