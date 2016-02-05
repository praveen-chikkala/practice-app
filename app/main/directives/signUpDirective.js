var app = angular.module('main');
app.directive('signUpDirective', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            ctrl.$parsers.unshift(function(value) {
                // if (attr.ngModel === "uname") {
                //     var regex = /\s/;
                //     var isExists = regex.test(value);
                //     if (isExists) {
                //         ctrl.$setValidity('validUname', false);
                //         return undefined;
                //     } else {
                //         ctrl.$setValidity('validUname', true);
                //         return value;
                //     }
                // }
                if (attr.ngModel === "pwd") {
                    var pregex = /^[a-zA-Z0-9]+$/;
                    var isPExists = pregex.test(value);
                    if (value == "" || isPExists) {
                        ctrl.$setValidity('validPwd', true);
                        return value;
                    } else {
                        ctrl.$setValidity('validPwd', false);
                        return undefined;
                    }
                }

            });


        }
    };
});
