"use strict";

var _require = require('console'),
    profile = _require.profile;

var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var _require2 = require('../models/profile'),
    Profile = _require2.Profile; // A function for retrieving the information of the logged in user


router.get('/profile/:email', function (req, res) {
  var email = req.params.email;
  Profile.find({
    email: email
  }, function (err, response) {
    if (err) res.send(err);else res.send(response);
  });
});
router.post('/profile', function _callee(req, res) {
  var car, profile;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Profile.findOne({
            car: req.body.car
          }));

        case 2:
          car = _context.sent;
          console.log(car);

          if (!car) {
            profile = new Profile({
              email: req.body.email,
              car: req.body.car,
              serialNumber: req.body.serialNumber
            });
            profile.save(function (err, doc) {
              if (!err) {
                res.send(doc);
              } else {
                console.log('Error in message Save :' + JSON.stringify(err, undefined, 2));
              }
            });
          } else {
            res.send(err);
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); //A function allows the user to delete vehicles from his profile

router["delete"]('/profile/:serialNumber', function (req, res) {
  Profile.findOneAndRemove({
    serialNumber: req.params.serialNumber
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in profile Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});
module.exports = router;