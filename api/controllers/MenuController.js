/**
 * MenuController
 *
 * @description :: Server-side logic for managing menus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function (req, res) {
    Menu.find({}, function (err, results) {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(results);
    })
  },

  getOne: function (req, res) {
    var params = req.params.all();
    Menu.findOne({id: params.menuTabId}, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  },

  create: function (req, res) {
    var params = req.params.all();
    console.log(params);
    Menu.create(params, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  },

  update: function (req, res) {
    var params = req.params.all();
    Menu.update({id: params.menutabId}, {
      pageId: params.pageId,
      order: params.order
    }, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  }
};

