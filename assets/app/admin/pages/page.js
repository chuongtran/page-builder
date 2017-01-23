angular.module('app.admin')
.config(function ($stateProvider) {
  $stateProvider.state('home.admin.pages.new', {
    url: '/new',
    views: {
      'admin-content@home.admin': {
        templateUrl: 'app/admin/pages/page.tpl.jade',
        controller: 'AdminSinglePageCtrl'
      }
    },
    resolve: {
      page: function () {
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

  $stateProvider.state('home.admin.pages.page', {
    url: '/:pageId',
    views: {
      'admin-content@home.admin': {
        templateUrl: 'app/admin/pages/page.tpl.jade',
        controller: 'AdminSinglePageCtrl'
      }
    },
    resolve: {
      page: function (Restangular, $stateParams) {
        return Restangular.one('pages').one($stateParams.pageId).get();
      }
    }
  })
})
.controller('AdminSinglePageCtrl', function ($scope, Restangular, page) {
    
  $scope.page = page;
  $scope.updatePage = function () {
    var url;
    if ($scope.page.id) {
      url = Restangular.one('pages').one(String($scope.page.id));
    }
    else {
      url = Restangular.one('pages')
    }
    url.post('', $scope.page)
      .then(function () {
        swal('DONE', '', 'success');
      }, function () {
        swal('ERROR', '', 'error');
      })
  }
})