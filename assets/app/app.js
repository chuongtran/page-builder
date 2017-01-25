var appModule = angular.module('app', [
  'ui.router',
  'restangular',
  'templates-app',
  'app.admin',
  'app.front',
  'ngMaterial',
  'md.data.table',
  'ui.sortable'
])
angular.module('app.admin', []);
angular.module('app.front', []);


appModule
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RestangularProvider',
    function appConfig ($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider) {
      RestangularProvider.setBaseUrl('/api/v1');
      $locationProvider.html5Mode(true);
      $stateProvider.state('home', {
        url: '/',
        abstract: true,
        views: {
          'main': {
            template: '<div ui-view="content"></div>'
          }
        }
      });

      $stateProvider.state('home.admin', {
        url: 'admin',
        views: {
          'content@home': {
            controller: 'AdminCtrl',
            templateUrl: 'app/admin/admin.tpl.jade'
          },
        },
        resolve: {
          pages: function (Restangular) {
            return Restangular.one('pages').get('');
          },
          menuTabs: function (Restangular) {
            return Restangular.one('menutabs').get('');
          }
        }
      });

      $stateProvider.state('home.front', {
        url: '',
        views: {
          'content@home': {
            controller: 'FrontCtrl',
            templateUrl: 'app/front/front.tpl.jade'
          }
        },
        resolve: {
          pages: function (Restangular) {
            return Restangular.one('pages').get('');
          },
          posts: function (Restangular) {
            return Restangular.one('posts').get('');
          },
          menuTabs: function (Restangular) {
            return Restangular.one('menutabs').one('getWithPageTitle').get('');
          }
        }
      })
    }])
  // END CONFIG

  .constant('StaticParams', {
    tableQuery : {
      order: '-id',
      limit: 8,
      page: 1,
      offset: 0,
    },
    tableOptions: {
      rowSelection: true,
      multiSelect: true,
      autoSelect: true,
      decapitate: false,
      largeEditDialog: false,
      boundaryLinks: false,
      limitSelect: true,
      pageSelect: true,
      limitOptions: [8, 16, 24],
      label: {
        page: 'Page:',
        rowsPerPage: 'Per Page:',
        of: '/' 
      }
    },
  })