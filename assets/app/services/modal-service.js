angular.module('CMSApp.services')
.service('ModalService', function ($uibModal) {
	return {
		showAddPrebuildFieldPopup: function (isLocked) {
			return $uibModal.open({
				backdrop: 'static',
				size: 'lg',
				resolve: {
					isLocked: isLocked || false
				},
				controller: 'addPrebuildFieldCtrl',
				templateUrl: 'app/templates/add-prebuild-field-popup.html'
			});
		},

		showTypeManagementPopup: function (types) {
			$uibModal.open({
				backdrop: 'static',
				size: 'lg',
				controller: 'typeManagementCtrl',
				templateUrl: 'app/templates/types-management-popup.html'
			});
		},

		showLockedFieldsManagementPopup: function () {
			$uibModal.open({
				backdrop: 'static',
				size: 'lg',
				controller: 'lockedFieldsManagementCtrl',
				templateUrl: 'app/templates/locked-fields-management-popup.html'
			});
		}


	}
})
.controller('addPrebuildFieldCtrl', function ($scope, $uibModalInstance, Restangular, isLocked, StaticParams, AlertService) {
	$scope.types = StaticParams.types;

	$scope.isLocked = isLocked;
	$scope.newField = {
		name: '',
		type: '',
		required: false,
		isTemplate: true,
		isLocked: false
	}
	if ($scope.isLocked) {
		$scope.newField.isLocked = true;
		$scope.newField.isTemplate = false;
		$scope.newField.sectionId = 1;
	}
	$scope.addPrebuildField = function () {
		Restangular.one('fields').post('', $scope.newField)
			.then(function (newField) {
				return $uibModalInstance.close(newField);
			}, function () {
				AlertService.failAlert('FAIL');
			})
	}

	$scope.cancel = function () {
		$uibModalInstance.close();
	}

})

.controller('typeManagementCtrl', function ($scope, $uibModal, StaticParams, Restangular) {
	$scope.types = StaticParams.types;
})

.controller('lockedFieldsManagementCtrl', function ($scope, $uibModalInstance, StaticParams) {
	$scope.types = StaticParams.types;
	$scope.newField = {
		name: '',
		type: '',
		required: false,
		isTemplate: false,
		isLocked: true
	}


	$scope.addNewLockedField = function () {

	}

	$scope.cancel = function () {
		$uibModalInstance.close();
	}
})