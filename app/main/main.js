'use strict';
angular.module('main', [
    'ionic',
    'ngCordova',
    'ui.router',
    'ngStorage',
    'ngCordovaOauth',
    'ionic.tour'
    // TODO: load other modules selected during generation
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'main/templates/login.html',
        controller: 'loginCtrl as loginController'
      }).state('signUp', {
        url: "/signUp",
        cache: false,
        templateUrl: 'main/templates/signUp.html',
        controller: 'signUpCtrl as signUpController'
      }).state('forgotPwd', {
        url: "/forgotPwd",
        cache: false,
        templateUrl: 'main/templates/forgotPwd.html'
      }).state('leftMenu', {
        url: "/leftMenu",
        abstract: true,
        cache: false,
        templateUrl: 'main/templates/leftMenu.html',
        controller: 'menuCtrl'
      })
      .state('leftMenu.first', {
        url: "/menuFirst",
        cache: false,
        views: {
          'menuDynamic': {
            templateUrl: "main/templates/signUp.html"
          }
        }
      }).state('leftMenu.second', {
        url: "/menuSecond",
        cache: false,
        views: {
          'menuDynamic': {
            templateUrl: "main/templates/formOne.html",
            resolve: {
              imagesData: ['$q', 'imageService',
                function($q, imageService) {
                  if (imageService.getImagesList().length > 0)
                    return $q.resolve(imageService.getImagesList());
                  else
                    return $q.reject({
                      isValid: false
                    });
                }
              ]
            },
            controller: 'gridCtrl as GridController'
          }
        }
      }).state('leftMenu.third', {
        url: "/menuThree",
        cache: false,
        views: {
          'menuDynamic': {
            templateUrl: "main/templates/forgotPwd.html"
          }
        }
      }).state('details', {
        url: "/details",
        cache: false,
        templateUrl: "main/templates/details.html",
        controller: 'detailsCtrl'
      });
  });
angular.module('main').run(function($state, $rootScope, customPopup) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // event.preventDefault();
    // $state.go('error', JSON.stringify(error)); // error has data, status and config properties
    console.log("error");
    if (!error.isValid) {
      customPopup.showPopup("Alert","No images found");
    }
  });
});
