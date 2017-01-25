/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  get: function (req, res) {
    Page.find({}, function (err, results) {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(results);
    })
  },

  getOne: function (req, res) {
    var params = req.params.all();
    Page.findOne({id: params.pageId}, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  },


  create: function (req, res) {
    var params = req.params.all();
    console.log(params);
    Page.create(params, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  },

  update: function (req, res) {
    var params = req.params.all();
    Page.update({id: params.pageId}, {
      title: params.title,
      slug: params.slug,
      content: params.content,
      isFront: params.isFront,
      order: params.order
    }, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  },

  updateFrontPage: function (req, res) {
    var params = req.params.all();
    var updateOldPage = function (cb) {
      Page.update({isFront: true}, {isFront: false}, function (err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
    }
    var updateNewPage = function (cb) {
      Page.update({id: params.pageId}, {isFront: true}, function (err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
    }
    async.auto([
     updateOldPage, updateNewPage
    ], function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({status: 'SUCCESS'});
    })
  },

  updateBlogPage: function (req, res) {
    var params = req.params.all();
    var updateOldPage = function (cb) {
      Page.update({isBlog: true}, {isBlog: false}, function (err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
    }
    var updateNewPage = function (cb) {
      Page.update({id: params.pageId}, {isBlog: true}, function (err, result) {
        if (err) {
          return cb(err);
        }
        cb(null, result);
      });
    }
    async.auto([
     updateOldPage, updateNewPage
    ], function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({status: 'SUCCESS'});
    })
  }
};

