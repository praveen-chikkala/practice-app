'use strict';
angular.module('main', [
        'ionic',
        'ngCordova',
        'ui.router',
        'ngStorage'
        // TODO: load other modules selected during generation
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'main/templates/login.html',
                controller: 'loginCtrl as loginController'
            }).state('signUp', {
                url: "/signUp",
                templateUrl: 'main/templates/signUp.html',
                controller: 'signUpCtrl as signUpController'
            }).state('forgotPwd', {
                url: "/forgotPwd",
                templateUrl: 'main/templates/forgotPwd.html'
            }).state('leftMenu', {
                url: "/leftMenu",
                abstract:true,
               templateUrl: 'main/templates/leftMenu.html'
            })
            .state('leftMenu.first', {
                url: "/menuFirst",
                views: {
                    'menuDynamic': {
                        templateUrl: "main/templates/signUp.html"
                    }
                }
            });
    });
