
/**
 * FieldController
 *
 * @description :: Server-side logic for managing fields
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getAll: function (req, res) {
    Field.find({}, function (err, sections) {
      if (err) {
        return res.status(500).json(err);
      }
      else {
        return res.status(200).json(sections);
      }
    })
  },

  create: function (req, res) {
    var params = req.params.all();
    Field.create(params, function (err, newField) {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(newField);
    })
  },

  delete: function (req, res) {
    var params = req.params.all();
    async.auto([
      function (cb) {
        Field.destroy({id: params.fieldId}, function (err) {
          if (err) {
            console.log(err);
            return cb(err);
          }
          cb(null, {});
        })
      },
      function (cb) {
        Choice.destroy({
          fieldId: params.fieldId
        }, function (err, result) {
          if (err) {
            console.log(err);
            return cb(err);
          }
          cb(null, {});
        })
      }], function (err, result) {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        }
        res.status(200).json({status: "SUCCESS"});
      }
    )
   
  },

  update: function (req, res) {
    var params = req.params.all();
    Field.update(
      {
        id: params.fieldId
      },
      {
        sectionId: params.sectionId,
        name: params.name,
        type: params.type,
        required: params.required,
        isLocked: params.isLocked,
        isTemplate: params.isTemplate
      },
      function (err, updatedChoice) {
        if (err) {
          return res.status(400).json(err);
        }
        res.status(200).json(updatedChoice);
      }
    )
  }

};

