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
    var createNewTab = function (cb) {
      Menu.create(params, function (err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      })
    }
    var updateOthers = function (cb) {
      var query = 'UPDATE menu SET `order` = `order`+1 WHERE `order` >= ?';
      Menu.query(query, [params.order], function (err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      })
    }
    async.auto({
      updateOthers: updateOthers,
      createNewTab: ['updateOthers', createNewTab],
    }, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({status: 'DONE'})
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
  },

  updateOrder: function (req, res) {
    params = req.params.all();
    var asyncArr = _.map(params.menuTabs, function (menu) {
      return function (cb) {
        Menu.update({pageId: menu.pageId}, {order: menu.order}, function (err, result) {
          if (err) {
            return cb(err);
          }
          cb(null, result);
        });
      }
    })
    async.auto(asyncArr, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({status: 'DONE'});
    })
  },

  deleteByPageId: function (req, res) {
    var params = req.params.all();
    Menu.destroy({pageId: params.pageId}, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({status: 'DONE'});
    })
  },

  getWithPageTitle: function (req, res) {
    var query = 'SELECT * FROM `menu` LEFT JOIN `page` ON menu.pageId = page.id';
    Menu.query(query, [], function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    });
  }
};

