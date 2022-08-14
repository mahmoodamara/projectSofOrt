"use strict";

var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var _require = require('../models/team'),
    Team = _require.Team; //The function extracts contact information on the site from the Team DB


router.get('/team', function (req, res) {
  Team.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Product :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function that allows add an existing Team in DB

router.post('/team', function (req, res) {
  var team = new Team({
    name: req.body.name,
    job: req.body.job,
    description: req.body.description,
    photo: req.body.photo,
    insta: req.body.insta,
    facebook: req.body.facebook,
    twitter: req.body.twitter
  });
  team.save(function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Product Save :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function that allows updating an existing Team in DB

router.put('/team/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var team = {
    name: req.body.name,
    job: req.body.job,
    description: req.body.description,
    photo: req.body.photo,
    insta: req.body.insta,
    facebook: req.body.facebook,
    twitter: req.body.twitter
  };
  Team.findByIdAndUpdate(req.params.id, {
    $set: team
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // // A function that allows deleting an existing Team from DB

router["delete"]('/team/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Team.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});
module.exports = router;