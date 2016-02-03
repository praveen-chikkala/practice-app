var app = angular.module('main');
app.directive('signUpDirective', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watchGroup(['cpwd', 'pwd'], function(newValue, oldValue, scope) {
                console.log(newValue);
                console.log(oldValue);
            }, true);
            ctrl.$parsers.unshift(function(value) {
                if (attr.ngModel === "uname") {
                    var regex = /\s/;
                    var isExists = regex.test(value);
                    if (isExists) {
                        ctrl.$setValidity('validUname', false);
                        return false;
                    } else {
                        ctrl.$setValidity('validUname', true);
                        return true;
                    }
                }
                if (attr.ngModel === "pwd") {
                    var pregex = /^[a-zA-Z0-9]+$/;
                    var isPExists = pregex.test(value);
                    if (value == "" || isPExists) {
                        ctrl.$setValidity('validPwd', true);
                        return true;
                    } else {
                        ctrl.$setValidity('validPwd', false);
                        return false;
                    }
                }
                if (attr.ngModel === "cpwd") {

                }

            });


        }
    };
});
