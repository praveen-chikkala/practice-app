'use strict';
angular.module('main', [
        'ionic',
        'ngCordova',
        'ui.router',
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
                templateUrl: 'main/templates/signUp.html'
            }).state('forgotPwd', {
                url: "/forgotPwd",
                templateUrl: 'main/templates/forgotPwd.html'
            });
    });
