/**
 * Field.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    sectionId: {
      type: 'integer',
    },
    name: {
      type: 'string',
      required: true
    },
    order: {
      type: 'integer',
      defaultsTo: 0
    },
    type: {
      type: 'string',
      required: true
    },
    required: {
      type: 'boolean',
      defaultsTo: false
    },
    isTemplate: {
      type: 'boolean',
      defaultsTo: false
    },
    isLocked: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};

