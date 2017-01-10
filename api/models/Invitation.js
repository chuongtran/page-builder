/**
* Invitation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	organizationId : {
      type :'integer',
      required : true
    },
    projectId: {
      type :'integer',
      required : false
    },
    email : {
      type : 'string',
      required : true
    },
    accessRole : {
      type : 'string',
      in : ['admin', 'engineer'],
      defaultsTo : 'engineer'
    },
    valid: {
      type: 'boolean',
      required: false
    }
  }
};

