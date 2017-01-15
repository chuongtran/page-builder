/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /api/v1/sections': 'SectionController.getAll',
  'post /api/v1/sections': 'SectionController.create',
  'post /api/v1/sections/:sectionId': 'SectionController.update',
  'delete /api/v1/sections/:sectionId': 'SectionController.delete',
  'post /api/v1/sections/:sectionId/fields': 'SectionController.addFieldToSection',
  'delete /api/v1/sections/:sectionId/fields/:fieldId': 'SectionController.removeFieldFromSection',
  'post /api/v1/sections/:sectionId/reorder': 'SectionController.reOrder',




  'get /api/v1/fields': 'FieldController.getAll',
  'post /api/v1/fields': 'FieldController.create',
  'post /api/v1/fields/:fieldId': 'FieldController.update',
  'delete /api/v1/fields/:fieldId': 'FieldController.delete',


  'get /api/v1/types': 'TypeController.getAll',


  
  'get /api/v1/choices': 'ChoiceController.getAll',
  'post /api/v1/choices': 'ChoiceController.create',
  'post /api/v1/choices/:choiceId': 'ChoiceController.update',
  'delete /api/v1/choices/:choiceId': 'ChoiceController.delete',

  'get /*': {
    controller: 'IndexController',
    action: 'userhome',
    skipAssets: true
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
