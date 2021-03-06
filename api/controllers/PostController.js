/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function (req, res) {
    Post.find({}, function (err, results) {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(results);
    })
  },

  getOne: function (req, res) {
    var params = req.params.all();
    Post.findOne({id: params.postId}, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  },


  create: function (req, res) {
    var params = req.params.all();
    console.log(params);
    Post.create(params, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  },

  update: function (req, res) {
    var params = req.params.all();
    Post.update({id: params.postId}, {
      title: params.title,
      slug: params.slug,
      content: params.content,
      isPublished: params.isPublished,
    }, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(result);
    })
  }
};

