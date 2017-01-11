angular.module('CMSApp', [
  'templates-app',
  'ui.router',
  'ui.bootstrap',
  'restangular',
])
.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RestangularProvider',
  function appConfig ($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1');
    $locationProvider.html5Mode(true);
    $stateProvider.state('home', {
      url: '/',
      views: {
        'main': {
          controller: 'HomeCtrl',
          templateUrl: 'app/form-builder.html'
        }
      }
    })
  }
])
.controller('HomeCtrl', function ($rootScope, $scope, $http, $log, $timeout, Restangular) {


    $scope.predicate = '-id';
    $scope.reverse = false;
    $scope.baseUrl = '/api/v1';
    $scope.chatList = [];

    io.socket.get($scope.baseUrl + '/chat/connect-io', function (data) {
      console.log(data);
    });
    $scope.getAllchat = function() {
      $http.get($scope.baseUrl + '/chat')
        .success(function(success_data) {
          $scope.chatList = success_data;
          $log.info(success_data);
        });
    };

    $scope.getAllchat();
    $scope.chatUser = "nikkyBot"
    $scope.chatMessage = "";

    io.socket.on('chat', function(obj) {
      if (obj.verb === 'created') {
        $log.info(obj)
        $scope.chatList.push(obj.data);
        $scope.$digest();
      }
    });

    $scope.sendMsg = function() {
      $log.info($scope.chatMessage);
      io.socket.post('/chat/addconv/', { userName: $scope.chatUser, message: $scope.chatMessage });
      $scope.chatMessage = "";
    };
});
