/**
 * TypeController
 *
 * @description :: Server-side logic for managing types
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getAll: function (req, res) {
    Type.find({}, function (err, sections) {
      if (err) {
        return res.status(500).json(err);
      }
      else {
        return res.status(200).json(sections);
      }
    })
  }
};

