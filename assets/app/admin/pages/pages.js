angular.module('app.admin')
.config(function ($stateProvider) {
  $stateProvider.state('home.admin.pages', {
    url: '/pages',
    views: {
      'admin-content@home.admin': {
        templateUrl: 'app/admin/pages/pages.tpl.jade',
        controller: 'AdminPagesCtrl'
      }
    }
  })
})
.controller('AdminPagesCtrl', function ($scope, StaticParams, pages, Restangular) {
  $scope.options = angular.copy(StaticParams.tableOptions)
  $scope.query = angular.copy(StaticParams.tableQuery);
  $scope.pages = pages;


  $scope.global = {};

  var frontPage = _.find($scope.pages, function (page) {
    return page.isFront;
  })
  $scope.global.frontPageId = frontPage && frontPage.id || 0;

  $scope.updateFrontPage = function () {
    Restangular.one('pages').one(String($scope.global.frontPageId)).post('updateFrontPage');
  }

})