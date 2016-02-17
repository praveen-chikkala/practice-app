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
                cache:false,
                templateUrl: 'main/templates/login.html',
                controller: 'loginCtrl as loginController'
            }).state('signUp', {
                url: "/signUp",
                cache:false,
                templateUrl: 'main/templates/signUp.html',
                controller: 'signUpCtrl as signUpController'
            }).state('forgotPwd', {
                url: "/forgotPwd",
                cache:false,
                templateUrl: 'main/templates/forgotPwd.html'
            }).state('leftMenu', {
                url: "/leftMenu",
                abstract: true,
                cache:false,
                templateUrl: 'main/templates/leftMenu.html',
                controller: 'menuCtrl'
            })
            .state('leftMenu.first', {
                url: "/menuFirst",
                cache:false,
                views: {
                    'menuDynamic': {
                        templateUrl: "main/templates/signUp.html"
                    }
                }
            }).state('leftMenu.second', {
                url: "/menuSecond",
                cache:false,
                views: {
                    'menuDynamic': {
                        templateUrl: "main/templates/login.html"
                    }
                }
            }).state('leftMenu.third', {
                url: "/menuThree",
                cache:false,
                views: {
                    'menuDynamic': {
                        templateUrl: "main/templates/forgotPwd.html"
                    }
                }
            }).state('details', {
                url: "/details",
                cache:false,
                templateUrl: "main/templates/details.html",
                 controller: 'detailsCtrl'
            });
    });
