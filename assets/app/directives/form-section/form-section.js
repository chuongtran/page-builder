angular.module('CMSApp.directives')
.directive('formSection', function () {
	return {
		restrict: 'E',
		templateUrl: 'app/directives/form-section/form-section.html',
		controller: 'formSectionCtrl',
		scope: true
	}
})
.controller('formSectionCtrl', function ($scope, StaticParams, Restangular, AlertService) {
	if (!$scope.section) return;
	$scope.types = StaticParams.types;
	$scope.newField = {
		name: 'New Field',
		isLocked: false,
		isTemplate: false,
		type: 'text',
		sectionId: $scope.section.id,
		order: $scope.section.fields.length,
		required: false,
	}

	$scope.newChoice = {
		fieldId: null,
		sectionToAdd: null,
		value: '',
		name: 'New Choice'
	}


	$scope.waitingForUpdateSection = _.debounce(function (section) {
		$scope.updateSection(section);
	}, 300);
	$scope.updateSection = function (section) {
		Restangular.one('sections').post(section.id, section);
	}

	$scope.removeUsingSection = function (section) {
		var sectionChoice = _.find($scope.choices, function (c) {
			return c.sectionToAdd == section.id;
		})
		if (sectionChoice) {
			sectionChoice.sectionToAdd = null;
			_.remove($scope.usingSections, function (sec) {
				return sec.id == section.id;
			})
			$scope.updateChoice(sectionChoice);
		}
	}


	$scope.addNewChoice = function (field) {
		var newChoice = angular.copy($scope.newChoice);
		newChoice.fieldId = field.id;
		field.choices = field.choices || [];
		Restangular.one('choices').post('', newChoice).then(function (addedChoice) {
			field.choices.push(addedChoice);
			$scope.choices.push(addedChoice);
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
		if (choice.sectionToAdd == '') {
			choice.sectionToAdd = null;
		}
		Restangular.one('choices').post(choice.id, choice);
	}

	$scope.changeChoiceSection = function (choice) {
		if (choice.sectionToAdd) {
			$scope.usingSections.push($scope.groupedSections[choice.sectionToAdd]);
		}
	}

	$scope.addNewField = function (section) {
		var newField = angular.copy($scope.newField);
		newField.order = section.fields.length || 0;
		Restangular.one('fields').post('', newField)
			.then(function (addedField) {
				$scope.section.fields.push(addedField);
			})
	}

	$scope.waitingForUpdateField = _.debounce(function (field) {
		$scope.updateField(field);
	}, 300)

	$scope.updateField = function (field) {
		Restangular.one('fields').post(field.id, field);
	}

	$scope.removeField = function (section, field) {
		var choices = _.indexBy(field.choices, 'id');
		AlertService.confirmAlert('', function () {
			Restangular.one('sections').one(String(section.id)).one('fields').customDELETE(field.id, field)
				.then(function () {
					_.remove(section.fields, function (f) {
						return f.id == field.id;
					});
					_.remove($scope.choices, function (choice) {
						return choices[choice.id];
					})
					$scope.prepareUsingSections();
				});
		})
		
	}

	$scope.sectionFieldsSortable = {
		pointer: 'tolerance',
		stop: function (e, ui) {
			// $scope.section.fields = ui.item.sortable.sourceModel;
			// _.forEach($scope.section.fields, function (field, index) {
			// 	field.order = index;
			// })
			Restangular.one('sections').one(String($scope.section.id)).post('reorder', {
				fields: ui.item.sortable.sourceModel
			})
		}
	}
})