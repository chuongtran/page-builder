angular.module('app.front')
.controller('FrontCtrl', function ($scope, $state, pages, posts, menuTabs) {
	$scope.menuTabs = menuTabs;
  $scope.frontPage = _.find(pages, function (p) {
    return p.isFront;
  })
  if ($scope.frontPage && !$state.params.pageId) {
    $state.go('home.front.page', {pageId: $scope.frontPage.id});
  }
})