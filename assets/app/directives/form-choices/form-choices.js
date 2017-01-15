angular.module('CMSApp.directives')
.directive('formChoices', function () {
	return {
		restrict: 'E',
		templateUrl: 'app/directives/form-choices/form-choices.html',
		controller: 'formChoicesCtrl',
		scope: true
	}
})
.controller('formChoicesCtrl', function ($scope, StaticParams, Restangular, AlertService) {

})