var app = angular.module('main');
app.service('customService', ['$http', function($http) {
    this.getCall = function(getScope, successCall, errorCall, url, data, config) {
        $http.get(url, data, config).then(function(successData) {
            getScope.successCall(successData);
        }, function(successData) {
            getScope.errorCall(errorData);
        });
    };
    this.postCall = function(postScope, successCall, errorCall, url, data, config) {
        $http.post(url, data, config).then(function(successData) {
            postScope[successCall](successData);
        }, function(errorData) {
            postScope.loginError(errorData);
        });
    };
}]);
