const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Treatment } = require('../models/carTreatment');
var {
  Cars
} = require('../models/cars');

router.get('/treatment', (req, res) => {
    Treatment.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving home :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/treatment', (req, res) => {
    var treatment = new Treatment({
        car: req.body
    });
    treatment.save((err, doc) => {
    if (!err) { res.send(doc); }
        else { console.log('Error in home Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/treatment/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);
      Treatment.findByIdAndRemove(req.params.id, (err, doc) => {
      res.send(doc);
      if (!err) {
        Cars.updateOne({
          serialNumber:doc.car.serialNumber
        }, {
          $set: {
            carService: false,
        }
        }, (err, doc) => {
          if (!err) {
            // res.send(doc)
          } else {
            console.log('Error in car Update :' + JSON.stringify(err, undefined, 2));
          }
        });
      }
      else { console.log('Error in treatment Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;
