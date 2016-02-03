var app = angular.module('main');
app.controller('loginCtrl', ['$scope', '$state', function($scope, $state) {
    var loginController = this;
    loginController.loadSignUp = function() {
        $state.go("signUp");
    };
    loginController.loadforgotPwd = function() {
        $state.go("forgotPwd");
    };
}]);
app.controller('signupCtrl', ['$scope', function(scope) {
    // scope.$watchGroup(['pwd', 'cpwd'], function(newValue, oldValue) {
    //     console.log(newValue);
    //     console.log(oldValue);
    // });
}]);
