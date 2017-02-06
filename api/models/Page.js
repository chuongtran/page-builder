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
    slug: {
      type: 'string',
      unique: true,
      required: true
    },
    content: {
      type: 'longtext'
    },
    isFront: {
      type: 'boolean',
      defaultsTo: false
    },
    isBlog: {
      type: 'boolean',
      defaultsTo: false
    },
    order: {
      type: 'integer',
      defaultsTo: 0
    }
  }
};

