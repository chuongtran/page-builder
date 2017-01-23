angular.module('app.admin')
.config(function ($stateProvider) {
  $stateProvider.state('home.admin.posts.new', {
    url: '/new',
    views: {
      'admin-content@home.admin': {
        templateUrl: 'app/admin/posts/post.tpl.jade',
        controller: 'AdminSinglePostCtrl'
      }
    },
    resolve: {
      post: function () {
        return {
          title: '',
          slug: '',
          content: '',
          isFront: false,
          order: 0
        }
      }
    }
  })

  $stateProvider.state('home.admin.posts.post', {
    url: '/:postId',
    views: {
      'admin-content@home.admin': {
        templateUrl: 'app/admin/posts/post.tpl.jade',
        controller: 'AdminSinglePostCtrl'
      }
    },
    resolve: {
      post: function (Restangular, $stateParams) {
        return Restangular.one('posts').one($stateParams.postId).get();
      }
    }
  })
})
.controller('AdminSinglePostCtrl', function ($scope, Restangular, post) {
    
  $scope.post = post;
  $scope.updatePost = function () {
    var url;
    if ($scope.post.id) {
      url = Restangular.one('posts').one(String($scope.post.id));
    }
    else {
      url = Restangular.one('posts')
    }
    url.post('', $scope.post)
      .then(function () {
        swal('DONE', '', 'success');
      }, function () {
        swal('ERROR', '', 'error');
      })
  }
})