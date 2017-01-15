/**
 * ChoiceController
 *
 * @description :: Server-side logic for managing choices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getAll: function (req, res) {
    Choice.find({}, function (err, sections) {
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
    Choice.create(params, function (err, newChoice) {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(newChoice);
    })
  },

  delete: function (req, res) {
    var params = req.params.all();
    Choice.destroy({id: params.choiceId}, function (err) {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json({status: 'Success'});
    })
  },

  update: function (req, res) {
    var params = req.params.all();
    Choice.update(
      {
        id: params.choiceId
      },
      {
        name: params.name,
        fieldId: params.fieldId,
        sectionToAdd: params.sectionToAdd,
        value: params.value
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

