angular.module('CMSApp.services')
.service('ModalService', function ($uibModal) {
	return {
		showAddPrebuildFieldPopup: function (isLocked, field) {
			return $uibModal.open({
				backdrop: 'static',
				size: 'lg',
				resolve: {
					isLocked: isLocked || false,
					field: function () {
						return field;
					}
				},
				controller: 'addPrebuildFieldCtrl',
				templateUrl: 'app/templates/add-locked-field-popup.html'
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
		},

		showEditPrebuildFieldPopup: function () {
			return $uibModal.open({
				backdrop: 'static',
				size: 'lg',
				controller: 'editPrebuildFieldCtrl',
				templateUrl: 'app/templates/edit-prebuild-field.html'
			});
		}


	}
})
.controller('addPrebuildFieldCtrl', function ($scope, $uibModalInstance, Restangular, isLocked, field, StaticParams, AlertService) {
	$scope.types = StaticParams.types;

	$scope.isLocked = isLocked;
	$scope.field = field || {
		name: '',
		type: '',
		required: false,
		isTemplate: true,
		isLocked: false
	}
	if ($scope.isLocked) {
		$scope.field.isLocked = true;
		$scope.field.isTemplate = false;
		$scope.field.sectionId = 1;
	}
	$scope.addPrebuildField = function () {
		Restangular.one('fields').post('', $scope.field)
			.then(function (newField) {
				return $uibModalInstance.close(newField);
			}, function () {
				AlertService.failAlert('FAIL');
			})
	}

	$scope.cancel = function () {
		$uibModalInstance.close();
	}



	// TODO: Duplicated code, need to put them into a directive
	$scope.waitingForUpdateField = _.debounce(function (field) {
		$scope.updateField(field);
	}, 300)

	$scope.updateField = function (field) {
		Restangular.one('fields').post(field.id, field);
	}
	$scope.newChoice = {
		fieldId: null,
		sectionToAdd: null,
		value: '',
		name: 'New Choice'
	}
	$scope.addNewChoice = function (field) {
		var newChoice = angular.copy($scope.newChoice);
		newChoice.fieldId = field.id;
		field.choices = field.choices || [];
		Restangular.one('choices').post('', newChoice).then(function (addedChoice) {
			field.choices.push(addedChoice);
			// $scope.choices.push(addedChoice);
		})
	}

	$scope.removeChoice = function (field, choice) {
		AlertService.confirmAlert('', function () {
			Restangular.one('choices').customDELETE(choice.id, {})
				.then(function () {
					_.remove(field.choices, function (c) {
						return c.id == choice.id;
					})
					if (choice.sectionToAdd) {
						_.remove($scope.usingSections, function (sec) {
							return sec.id == choice.sectionToAdd;
						})
					}
				});
		})
	}

	$scope.waitingForUpdateChoice = _.debounce(function (choice) {
		$scope.updateChoice(choice)
	}, 300);
	$scope.updateChoice = function (choice) {
		Restangular.one('choices').post(choice.id, choice);
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

.controller('editPrebuildFieldCtrl', function ($scope, StaticParams) {
	console.log('POPUP OPEN')
})