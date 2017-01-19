/**
 * Page.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    content: {
      type: 'string'
    },
    isFront: {
      type: 'boolean',
      defaultsTo: false
    },
    order: {
      type: 'integer',
      description: 0
    }
  }
};

