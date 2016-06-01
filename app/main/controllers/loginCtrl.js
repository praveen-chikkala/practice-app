var app = angular.module('main');
app.controller('loginCtrl', ['$scope', '$state', 'localService', 'customService', '$cordovaGeolocation', '$cordovaOauth', '$http', 'imageService', function($scope, $state, localService, customService, cordovaGeolocation, $cordovaOauth, $http, imageService) {
  var loginController = this;
  loginController.checkStorage = function() {
    if (localService.getRegisteredUsers()) {
      loginController.pwd = localService.getRegisteredUsers().password;
      loginController.isRemembered = true;
    }
  };
  loginController.checkStorage();
  //Function to get current latlngs using cordovageolocation plugin
  loginController.getLatLngs = function() {
    //17.7241 and 83.3071 - complex co-ordinates.
    cordovaGeolocation.getCurrentPosition().then(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      loginController.distance(lat, long);
    }, function(err) {
      console.log(err);
    });

  };
  //Function to get distance between two geopoints
  loginController.distance = function(lat2, lon2) {
    var lat1 = 17.7241;
    var lon1 = 83.3071;
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
  };
  loginController.getLatLngs();
  loginController.loadSignUp = function() {
    $state.go("signUp");
  };
  loginController.loadforgotPwd = function() {
    $state.go("forgotPwd");
  };
  /*
  //Function to get user's fb public data using the success access_token
  loginController.displayData = function($http, access_token) {
    $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: access_token, fields: "name,gender,location,picture", format: "json" } }).then(function(result) {
      var name = result.data.name;
      var gender = result.data.gender;
      var picture = result.data.picture;
      alert(name);
    }, function(error) {
      alert("Error: " + error);
    });
  };*/
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
    // customService.postCall($scope, "loginSuccessOne", "loginErrorOne", 'http://103.230.84.14/userservice.php', dataOne);
    // http.post('http://103.230.84.14/userservice.php', data).then(function(data) {
    //     console.log(data);
    // }, function(error) {
    //     console.log(error);
    // });
    $scope.loginSuccess = function(successData) {
      var dataOne = {
        "accTk": successData.data.posts[2].accessToken,
        "action": "getThemeList",
        "authkey": "k3w0We8.qGhNb1ldzs"
      };
      customService.postCall($scope, "loginSuccessOne", "loginErrorOne", 'http://103.230.84.14/userservice.php', dataOne);
    };
    $scope.loginError = function(errorData) {
      console.log(errorData);
    };
    $scope.loginSuccessOne = function(successData) {
      _.each(successData.data.posts[1].resultPost, function(post) {
        imageService.setImagesList(post.globalsettings[0].background.imageurl);
      });
      //successData.data.posts[1].resultPost[1].globalsettings[0].background.imageurl
      $state.go("leftMenu.second");
    };
    $scope.loginErrorOne = function(errorData) {
      console.log(errorData);
    };
    /*
    //cordova facebook plugin to get fb authentication usinf fb-dev app id
    $cordovaOauth.facebook("1690825224505069", ["email", "public_profile"], { redirect_uri: "http://localhost/" }).then(function(result) {
        alert("success: " + result.access_token);
        console.log(result.access_token);
        loginController.displayData($http, result.access_token);
    }, function(error) {
        console.log("Error: " + error);
    });
    */

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
app.controller('menuCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', '$timeout',function($scope, $state, $ionicSideMenuDelegate, $timeout) {
  $scope.loadFirstMenu = function() {
    $state.go("leftMenu.first");
  };
  $scope.loadSecondMenu = function() {
    $state.go("leftMenu.second");
  };
  $scope.loadThirdMenu = function() {
    $state.go("leftMenu.third");
  };
  $scope.openMenuLeft = function(element, tourtip) {
    $ionicSideMenuDelegate.toggleLeft(true);
  };
  $scope.closMenuLeft = function(element, tourtip) {
    $scope.loadSecondMenu();
    $ionicSideMenuDelegate.toggleLeft(false);
  };
  $scope.signout=function(){
    $state.go("login");
  }
  function initiateTour() {
    console.log("enter tour");
    //$scope.tour.removeStep("1");
    // $scope.tour.start({ autoplay: true });
  };
  $timeout(function() {
    initiateTour();
  }, 500);
}]);
app.controller('detailsCtrl', ['$scope', '$state', '$ionicSlideBoxDelegate', '$ionicHistory',function($scope, $state, $ionicSlideBoxDelegate,$ionicHistory) {
  $scope.ItemDetails = [{
    'imageUrl': 'main/assets/images/1.jpg'
  }, {
    'imageUrl': 'main/assets/images/2.jpg'
  }, {
    'imageUrl': 'main/assets/images/3.jpg'
  }, {
    'imageUrl': 'main/assets/images/4.jpg'
  }, {
    'imageUrl': 'main/assets/images/5.jpg'
  }, {
    'imageUrl': 'main/assets/images/6.jpg'
  }, {
    'imageUrl': 'main/assets/images/7.jpg'
  }, {
    'imageUrl': 'main/assets/images/8.jpg'
  }, {
    'imageUrl': 'main/assets/images/9.jpg'
  }, {
    'imageUrl': 'main/assets/images/10.jpg'
  }];
  $scope.goBackNow=function(){
    $ionicHistory.goBack();
  };
}]);
app.controller("gridCtrl", ['$scope', '$state', '$timeout', '$compile', 'imageService', 'imagesData', '$q', 'customPopup', function($scope, $state, $timeout, $compile, imageService, imagesData, $q, customPopup) {
  $scope.images = [];
  $scope.loadImages = function() {
    for (var i = 0; i < 11; i++) {
      $scope.images.push({ id: i, src: "http://placehold.it/150x150" });
    }
  };
  var images = imagesData;
  for (var i = 0; i < images.length; i++) {
    $scope.images.push({ id: i, src: images[i] });
  }
  $scope.tappedYes = function(res) {
    console.log("yes is tapped");
  };
  //$scope.images = imageService.getImagesList();
  $scope.gotoDetails = function(evt, obj) {
    customPopup.showPopup("Details", "Showing Image details", $scope);
    $state.go("details");
  };
  $timeout(function() {
    var trstp = document.getElementById('tourdyn');
    angular.element(trstp).append($compile("<div tour-step='3' style='position:relative;top:0px;'></div>")($scope));
    $scope.tour.next();
    console.log($scope.tour);
  }, 00);
}]);
app.controller("tourController", ['$scope', '$state', '$ionicTour', '$ionicSideMenuDelegate', function($scope, $state, $ionicTour, $ionicSideMenuDelegate) {
  console.log("main load");
  $scope.tourTitle = "Demo";
  $scope.tourContent = "Entertainment";
  $ionicTour.fromTemplateUrl('main/templates/tourLayout.html', {
    scope: $scope
  }).then(function(tour) {
    $scope.tour = tour;
  });
  $scope.next = function() {
    console.log("Next");
    console.log($scope.tour);
    if ($scope.tour._index === 1) {
      $state.go("leftMenu.second");
      $ionicSideMenuDelegate.toggleLeft(false);
    }
    if ($scope.tour._index === 2) {
      $state.go("details");
    }
    $scope.tour.next();
  };

  $scope.previous = function() {
    $scope.tour.previous();
  };
  $scope.finish = function() {
    console.log("cleared");
    $scope.tour.finish({
      destroy: false
    });
  };

  $scope.reset = function() {
    $scope.tour.reset();
  };
}]);
