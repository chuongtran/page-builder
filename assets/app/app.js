var appModule = angular.module('app', [
  'ui.router',
  'restangular',
  'templates-app',
  'app.admin',
  'app.front',
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
        },
      });

      $stateProvider.state('home.admin', {
        url: 'admin',
        views: {
          'content@home': {
            controller: 'AdminCtrl',
            templateUrl: 'app/admin/dashboard.tpl.jade'
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
        }
      })
    }])