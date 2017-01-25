angular.module('app.front')
.config(function ($stateProvider) {
  $stateProvider.state('home.front.page', {
    url: 'page/:pageId',
    views: {
      'front-content@home.front': {
        controller: 'FrontendPageCtrl',
        templateUrl: 'app/front/page/page.tpl.jade'
      },
    },
    resolve: {
      page: function (Restangular, $stateParams) {
        return Restangular.one('pages').one(String($stateParams.pageId)).get();
      },
      posts: function (page, Restangular) {
        if (page.isBlog) {
          return Restangular.one('posts').get();
        }
        else return Restangular;
      }
    }
  })
})
.controller('FrontendPageCtrl', function ($scope, page, posts) {
  console.log('PAGE');
  $scope.page = page;
  if (page.isBlog) {
    $scope.posts = posts;
  }
})