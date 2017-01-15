/**
 * SectionController
 *
 * @description :: Server-side logic for managing sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getAll: function (req, res) {
    Section.find({}, function (err, sections) {
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
    Section.create(params, function (err, newSection) {
      if (err) {
        return res.status(400).json(err);
      }
      else {
        return res.status(200).json(newSection);
      }
    })
  },

  delete: function (req, res) {
    var params = req.params.all();
    SectionService.deleteSection(params.sectionId, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    })
  },

  update: function (req, res) {
    var params = req.params.all();
    Section.update(
      {
        id: params.sectionId
      },
      {
        name: params.name,
        description: params.description
      },
      function (err, result) {
        if (err) {
          return res.status(400).json(err);
        }
        res.status(200).json(result);
      }
    )
  },

  addFieldToSection: function (req, res) {
    var params = req.params.all();
    console.log(params)
    async.auto({
      addField: function (cb) {
        Field.create({
          sectionId: params.sectionId,
          order: params.order,
          isTemplate: false,
          name: params.name,
          isLocked: false,
          required: params.required,
          type: params.type
        }, function (err, newField) {
          if (err) {
            return cb(err);
          }
          return cb(null, newField)
        })
      },
      getChoices: ['addField', function (cb, results) {
        Choice.find({fieldId: params.id}, function (err, choices) {
          if (err) {
            return cb(err);
          }
          return cb(null, choices);
        })
      }],
      addNewChoices: ['getChoices', function (cb, results) {
        var choices = results.getChoices;
        var subAsyncArr = [];
        var newChoices = [];
        _.forEach(choices, function (choice) {
          subAsyncArr.push(function (subCb) {
            Choice.create({
              name: choice.name,
              fieldId: results.addField.id,
              sectionToAdd: null,
              value: choice.value
            }, function (err, newChoice) {
              if (err) {
                return subCb(err);
              }
              newChoices.push(newChoice);
              subCb(null, newChoice);
            })
          })
        })
        async.auto(subAsyncArr, function (err, results) {
          if (err) {
            return cb(err);
          }
          console.log(newChoices);
          return cb(null, newChoices);
        });
      }],
      updateOtherFields: function (cb) {
        var sql = 'UPDATE field SET `order` = `order`+1 WHERE `sectionId` = ? AND `order` >= ?';
        Field.query(sql, [params.sectionId, params.order], function (err, fields) {
          if (err) {
            cb(err);
          }
          else cb(null, fields)
        })
      },
    }, function (err, results) {
      console.log(results);
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({status: 'Success'})
    })    
  },

  removeFieldFromSection: function (req, res) {
    var params = req.params.all();

    async.auto({
      removeField: function (cb) {
        Field.destroy({id: params.fieldId}, function (err, newField) {
          if (err) {
            return cb(err);
          }
          return cb(null, newField)
        })
      },
      updateOtherFields: function (cb) {
        var sql = 'UPDATE field SET `order` = `order`-1 WHERE `sectionId` = ? AND `order` > ?';
        Field.query(sql, [params.sectionId, params.order], function (err, fields) {
          if (err) {
            cb(err);
          }
          else cb(null, fields)
        })
      },
      removeFieldChoices: function (cb) {
        Choice.destroy({
          fieldId: params.fieldId
        }, function (err, result) {
          if (err) {
            return cb(err);
          }
          cb(null, {});
        })
      },
    }, function (err, results) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({status: 'Success'})
    }) 
  },

  reorder: function (req, res) {
    var params = req.params.all();
    var asyncArray = [];
    _.forEach(params.fields, function (field, index) {
      asyncArray.push(function (cb) {
        Field.update(
          {
            id: field.id
          },
          {
            order: index
          }, 
          function (err, updatedField) {
            if (err) {
              return cb(err)
            }
            cb(null, updatedField);
          }
        )
      })
    })
    async.auto(asyncArray, function (err, result) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({status: 'Success'})
    })
  }
};

