var appModule = angular.module('CMSApp', [
  'CMSApp.services',
  'CMSApp.directives',
  'CMSApp.form-using',
  'templates-app',
  'ui.router',
  'ui.bootstrap',
  'ui.sortable',
  'restangular',
])
angular.module('CMSApp.services', []);
angular.module('CMSApp.directives', [])

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
      resolve: {
        sections: function (Restangular) {
          return Restangular.one('sections').get()
        },
        fields: function (Restangular) {
          return Restangular.one('fields').get()
        },
        choices: function (Restangular) {
          return Restangular.one('choices').get()
        },
        preparingStaticParams: function (choices, StaticParams) {
          _.forEach(choices, function (choice) {
            choice.sectionToAdd = choice.sectionToAdd && String(choice.sectionToAdd);
          })
          StaticParams.choices = choices;
        }
      }
    })
    $stateProvider.state('home.form-builder', {
      url: '',
      views: {
        'content@home': {
          controller: 'HomeFormBuilderCtrl',
          templateUrl: 'app/home.html'
        }
      }
    })
    $stateProvider.state('home.form-using', {
      url: 'form',
      views: {
        'main@': {
          controller: 'FormUsingCtrl',
          templateUrl: 'app/form-using.html'
        }
      }
    })
  }
])
.controller('HomeFormBuilderCtrl', function ($rootScope, $scope, $state, $timeout, AlertService, ModalService, Restangular, sections, fields, choices, $uibModal) {
  $scope.choices = choices;
  $scope.groupedChoices = _.groupBy($scope.choices, 'fieldId');
  _.forEach(fields, function (field) {
    field.choices = $scope.groupedChoices[field.id];
  })

  $scope.prebuildFields = _.filter(fields, function (field) {
    return field.isTemplate;
  })

  $scope.groupedFields = _.groupBy(fields, function (f) {
    return f.sectionId;
  })
  _.forEach(sections, function (section) {
    section.fields = _.sortBy($scope.groupedFields[section.id], 'order');
  })


  $scope.mainSection = _.find(sections, function (sec) {
    return sec.id == 1;
  })
  $scope.usingSections = [];

  $scope.addedSections = _.filter(sections, function (sec) {
    return sec.id != 1;
  });

  $scope.groupedSections = _.indexBy(sections, 'id');

  $scope.prepareUsingSections = function () {
    choicedSections = _($scope.choices)
                        .groupBy('sectionToAdd')
                        .keys()
                        .filter(function (key){
                          return ''+key != 'null';
                        })
                        .map(function (key) {
                          return $scope.groupedSections[key];
                        })
                        .value()
    $scope.usingSections = [$scope.mainSection].concat(choicedSections);
  }
  $scope.prepareUsingSections();


  $scope.lockedFields = _.filter(fields, function (field) {
    return field.isLocked;
  })
    
  
  $scope.checkSectionAvaiable = function (section) {
    return _.find($scope.usingSections, function (sec) {
      return sec.id == section.id;
    })
  }

  // Sections
  $scope.addNewSection = function () {
    Restangular.one('sections').post('', {
      name: $scope.newSectionName
    }).then(function (newSection) {
      $scope.newSectionName = '';
      $scope.addedSections.push(newSection);
    }, function (err) {
      
      AlertService.failAlert(err.data.invalidAttributes.name[0].message);
    })
  }
  $scope.removeSection = function (section) {
    return AlertService.confirmAlert('', function () {
      return Restangular.one('sections').customDELETE(section.id, {})
      .then(function () {
        _.remove($scope.addedSections, function (sec) {
          return sec.id == section.id;
        })
      });
    })
  }

  // Prebuild field
  $scope.openAddPrebuildPopup = function (isLocked) {
    ModalService.showAddPrebuildFieldPopup(isLocked).result.then(function (newField) {
      if (newField) {
        if (newField.isLocked) {
          $scope.usingSections[0].fields.unshift(newField);
        }
        else {
          $scope.prebuildFields.push(newField);
        }
      }
    });
  }

  $scope.removePrebuildField = function (field) {
    AlertService.confirmAlert('', function () {
      Restangular.one('fields').customDELETE(field.id, {})
      .then(function () {
        _.remove($scope.prebuildFields, function (f) {
          return f.id == field.id;
        })
      });
    })
  }

  $scope.openEditPrebuildFieldPopup = function (field) {
    ModalService.showAddPrebuildFieldPopup(false, field).result.then(function (updatedField) {
      if (updatedField) {
        swal('DONE','','success');
      }
    })
  }


  // Sortable
  $scope.addNewPrebuildField = function () {
    var newField = {
      name: 'New Field',
      isLocked: false,
      isTemplate: true,
      type: 'text',
      sectionId: null,
      order: 0,
      required: false,
    }
    Restangular.one('fields').post('', newField).then(function (addedField) {
      $scope.prebuildFields.push(addedField);      
    })
  }
  var addFieldToSection = function (field, sectionId, order) {
    var tmpField = _.pick(field, 'isLocked', 'name', 'required', 'type');
    tmpField.sectionId = sectionId;
    tmpField.order = order || 0;
    tmpField.isTemplate = false;
    tmpField.id = field.id;
    Restangular.one('sections').one(String(sectionId)).post('fields', tmpField).then(function () {
      $state.reload();
    });
  }

  $scope.prebuildSortable = {
    connectWith: '.field-sortable',
    start: function (e, ui) {
      $scope.clonedPrebuildFields = angular.copy($scope.prebuildFields);
    },
    stop: function (e, ui) {
      var sortable = ui.item.sortable;
      if (sortable.droptarget && sortable.droptarget.scope().section) {
        $scope.prebuildFields = angular.copy($scope.clonedPrebuildFields);
        addFieldToSection(sortable.model, sortable.droptarget.scope().section.id, sortable.dropindex);
      }
    },
    update: function (e, ui) {
      var sortable = ui.item.sortable;
    }
  }
})

angular.module('CMSApp.form-using', ['ui.select2'])
.controller('FormUsingCtrl', function ($rootScope, $scope, sections, choices, fields, $uibModal) {
  $scope.sections = sections;
  $scope.choices = choices;
  $scope.fields = fields;
  $scope.form = {};

  // *NOTE: We need to reused the functions for preparing data in HomeFormBuilderCtrl.
  // Because the form builder is in admin state, have to pass authentication to enter that state.
  // Or we can do this parsing on back-end side.
  $scope.groupedChoices = _.groupBy(choices, 'fieldId');
  _.forEach(fields, function (field) {
    field.choices = $scope.groupedChoices[field.id];
  })
  $scope.groupedSections = _.indexBy(sections, 'id');

  $scope.groupedFields = _.groupBy(fields, function (f) {
    return f.sectionId;
  })
  _.forEach(sections, function (section) {
    section.fields = _.sortBy($scope.groupedFields[section.id], 'order');
  })

  $scope.mainSection = _.find(sections, function (sec) {
    return sec.id == 1;
  })
  $scope.usingSections = [$scope.mainSection];

  $scope.addSectionFields = [];
  $scope.pushAddSectionFields = function (formField) {
    if (formField.type == 'multi-select') return;
    var field = angular.copy(formField);
    var fieldValue = JSON.parse(field.fieldValue);
    field.parsedValue = fieldValue;

    var existedField = _.find($scope.addSectionFields, function (f) {
      return f.id == formField.id;
    })
    // Field has add section
    if (fieldValue.sectionToAdd) {

      if (existedField) {
        _.remove($scope.usingSections, function (sec) {
          return sec.id == existedField.parsedValue.sectionToAdd;
        })
        $scope.usingSections.push($scope.groupedSections[fieldValue.sectionToAdd])
        existedField.parsedValue = fieldValue;
      }
      else {
        $scope.addSectionFields.push(field);
        $scope.usingSections.push($scope.groupedSections[fieldValue.sectionToAdd]);
      }
    }
    else {
      if (existedField) {
        _.remove($scope.usingSections, function (sec) {
          return sec.id == existedField.parsedValue.sectionToAdd;
        })
        _.remove($scope.addSectionFields, function (f) {
          return f.id == existedField.id;
        })
      }
      $scope.form['field-'+field.id] = fieldValue.value;
    }
  }

  $scope.setMultipleOptions = function (fields) {
    return {
      multiple: true,
      tags: _.map(fields.choices, 'value')
    }
  } 

  // $scope.select2Options = {
  //   'multiple': true,
  //   'simple_tags': true,
  //   'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
  // };
  $scope.tmpString = {};
  $scope.setSelectOption = function (field) {
    if (field.type=='multi-select') {
      return {
        multiple: true
      }
    }
    return {
      multiple: false
    }
  }
  $scope.list_of_string = ['tag1', 'tag2'];
  $scope.select2Options = {
    multiple: true,
    'simple_tags': true,
    'tags': ['tag1', 'tag2', 'tag3', 'tag4'] 
  }

  $scope.groupSetup = {
    multiple: true,
    formatSearching: 'Searching the group...',
    formatNoMatches: 'No group found'
  }

  $scope.field = {};

  $scope.submitForm = function () {
    $uibModal.open({
      templateUrl: 'app/templates/form-submittion-results.html',
      resolve: {
        formData: function () {
          return $scope.form;
        }
      },
      controller: function ($scope, formData, $uibModalInstance) {
        $scope.formData = formData;
        $scope.cancel = function () {
          $uibModalInstance.close();
        }
      }
    })

  }
})

.constant('StaticParams', {
  types: {
    text: 'Text Field',
    email: 'Email Field',
    select: 'Select Box',
    'multi-select': 'Select Box Multiple',
  }
})

;