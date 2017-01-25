angular.module('app.admin')
.config(function ($stateProvider) {
  $stateProvider.state('home.admin.menu', {
    url: '/menu',
    views: {
      'admin-content@home.admin': {
        templateUrl: 'app/admin/menu/menu.tpl.jade',
        controller: 'AdminMenuCtrl'
      }
    },
    // resolve: {
    //   post: function () {
    //     return {
    //       title: '',
    //       slug: '',
    //       content: '',
    //       isFront: false,
    //       order: 0
    //     }
    //   }
    // }
  })
})
.controller('AdminMenuCtrl', function ($scope, pages, menuTabs, Restangular) {
  console.log('MENU');
  $scope.gropedPages = _.indexBy(pages, 'id');
  $scope.menuTabs = menuTabs;
  $scope.gropedTabs = _.indexBy(menuTabs, 'pageId');
  $scope.pages = _.filter(pages, function (page) {
    return !$scope.gropedTabs[page.id];
  })

  $scope.activePages = _.map(menuTabs, function (tab) {
    var page = $scope.gropedPages[tab.pageId] || {};
    page.order = tab.order;
    return page;
  });
  $scope.activePages = _.sortBy($scope.activePages, 'order');

  $scope.pageTabSortable = {
    connectWith: '.tabs',
    stop: function (e, ui) {
      var sortable = ui.item.sortable;
      if (sortable.droptarget.hasClass('tabs')) {
        Restangular.one('menutabs').post('', {
          pageId: sortable.model.id,
          order: sortable.dropindex
        })
      }
    }
  }
  $scope.tabSortable = {
    connectWith: '.pages',
    stop: function (e, ui) {
      var sortable = ui.item.sortable;
      if (sortable.droptarget.hasClass('tabs')) {
        Restangular.one('menutabs').post('updateOrder', {
          menuTabs: _.map($scope.activePages, function (page, index) {
            return {
              pageId: page.id,
              order: index
            }
          })
        })
      }
      else {
        Restangular.one('menutabs').one('deleteByPageId').customDELETE(sortable.model.id);
      }
    }
  }

})

