var app = angular.module('main');
app.service('imageService', function() {
  this.imagesList = {
    imagesPaths : []
  };
  this.getImagesList = function() {
    return _.uniq(this.imagesList.imagesPaths);
  };
  this.setImagesList = function(images) {
    this.imagesList.imagesPaths.push(images);
  };
});
