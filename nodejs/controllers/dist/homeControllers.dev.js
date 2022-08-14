"use strict";

var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var _require = require('../models/home'),
    Home = _require.Home; // The function extracts the details of the HOME department from the HOME DB


router.get('/home', function (req, res) {
  Home.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving home :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // // A function allows you to update the details of the home page

router.put('/home/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var home = {
    h1: req.body.h1,
    h2: req.body.h2,
    photo: req.body.photo
  };
  Home.findByIdAndUpdate(req.params.id, {
    $set: home
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in home Update :' + JSON.stringify(err, undefined, 2));
    }
  });
});
module.exports = router;