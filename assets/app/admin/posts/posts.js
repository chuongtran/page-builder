angular.module('app.admin')
.config(function ($stateProvider) {
  $stateProvider.state('home.admin.posts', {
    url: '/posts',
    views: {
      'admin-content@home.admin': {
        templateUrl: 'app/admin/posts/posts.tpl.jade',
        controller: 'AdminPostsCtrl'
      }
    }
  })
})
.controller('AdminPostsCtrl', function ($scope, StaticParams, posts, Restangular) {
  $scope.options = angular.copy(StaticParams.tableOptions)
  $scope.query = angular.copy(StaticParams.tableQuery);
  $scope.posts = posts;

  $scope.updatePost = function (post) {
    if (!post.id) return;
    return Restangular.one('posts').post(post.id, post)
  }
})