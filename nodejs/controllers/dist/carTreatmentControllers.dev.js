"use strict";

var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var _require = require('../models/carTreatment'),
    Treatment = _require.Treatment;

var _require2 = require('../models/cars'),
    Cars = _require2.Cars; // A function that pulls out all cars that are in service


router.get('/treatment', function (req, res) {
  Treatment.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving home :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // Function adding a car to the service

router.post('/treatment', function (req, res) {
  var treatment = new Treatment({
    car: req.body
  });
  treatment.save(function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in home Save :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // // A function to delete a car from the DB of carsTreatment.

router["delete"]('/treatment/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Treatment.findByIdAndRemove(req.params.id, function (err, doc) {
    res.send(doc);

    if (!err) {
      Cars.updateOne({
        serialNumber: doc.car.serialNumber
      }, {
        $set: {
          carService: false
        }
      }, function (err, doc) {
        if (!err) {// res.send(doc)
        } else {
          console.log('Error in car Update :' + JSON.stringify(err, undefined, 2));
        }
      });
    } else {
      console.log('Error in treatment Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});
module.exports = router;