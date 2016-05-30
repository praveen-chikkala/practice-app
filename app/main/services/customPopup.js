var app = angular.module('main');
app.service('customPopup', ['$ionicPopup', function($ionicPopup) {
  this.showPopup = function(title, content, scopeVariable) {
    var x = scopeVariable;
    var openPopup = $ionicPopup.alert({
      title: "<h3>" + title + "</h3>",
      template: "<p style='text-align: center'>" + content + "</p>",
      buttons: [{
        text: 'OK',
        type: 'custom-single-margin',
        onTap: function(e) {
           return true;
        }
      }]
    });
    openPopup.then(function(res) {
      if (res) {
        console.log('Tapped OK');
        return x.tappedYes();
      }
    });

  };

}]);
