angular.module('CMSApp.services')
.service('AlertService', function () {
  return {
    failAlert: function (message, title) {
      swal(title || 'ERROR', message, 'error');
    },
    successAlert: function (message, title) {
      swal(title || 'DONE', message, 'success');
    },
    confirmAlert: function (message, cb, title) {
      if (cb) {
        swal({
          title: title || 'Are you sure?',
          text: message,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          closeOnConfirm: true
        }, cb)
      }
    }
  }
})