"use strict";

var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var _require = require('../models/action'),
    Action = _require.Action;

var _require2 = require('../models/usersInAuction'),
    UserinAuction = _require2.UserinAuction; //The function retrieves the vehicles that have an auction from the Auction DB


router.get('/action', function (req, res) {
  Action.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Action :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // The function retrieves the Auction details according to the SerialNumber from the Auction DB.

router.get('/action/:serialNumber', function (req, res) {
  var serialNumber = req.params.serialNumber;
  Action.find({
    serialNumber: serialNumber
  }, function (err, response) {
    if (err) res.send(err);else res.send(response);
  });
}); // A function to add an Auction to the Auction's DB.

router.post('/action', function (req, res) {
  var ac = new Action({
    timeAction: req.body.timeAction,
    maxPrice: req.body.maxPrice,
    minPrice: req.body.minPrice,
    carPhoto: req.body.carPhoto,
    carModel: req.body.carModel,
    carType: req.body.carType,
    carKM: req.body.carKM,
    isButtonVisible: false,
    views: 0,
    serialNumber: req.body.serialNumber
  });
  ac.save(function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Action Save :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function to update Auction in the Auction DB.

router.put('/action/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var ac = {
    timeAction: req.body.timeAction,
    maxPrice: req.body.maxPrice,
    minPrice: req.body.minPrice,
    carPhoto: req.body.carPhoto,
    carModel: req.body.carModel,
    carType: req.body.carType,
    carKM: req.body.carKM,
    isButtonVisible: req.body.isButtonVisible,
    views: req.body.views,
    serialNumber: req.body.serialNumber
  };
  Action.findByIdAndUpdate(req.params.id, {
    $set: ac
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Auction Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); //A function to delete an Auction from the Auction's DB.

router["delete"]('/action/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Action.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function for adding additional time to the Auction after the end of the first time and closing the Auction after the end of the additional time.

function updateTimeAuction() {
  var d = new Date().getDate();
  var m = new Date().getMonth() + 1;
  var y = new Date().getFullYear();
  var h = new Date().getHours();
  var min = new Date().getMinutes();
  var s = new Date().getSeconds();
  time = "".concat(m, " ").concat(d, ",").concat(y, " ").concat(h, ":").concat(min, ":").concat(s);

  if (min + 3 < 60) {
    timeUpdate = "".concat(m, " ").concat(d, ",").concat(y, " ").concat(h, ":").concat(min + 3, ":").concat(s);
  }

  if (min + 3 >= 60) {
    timeUpdate = "".concat(m, " ").concat(d, ",").concat(y, " ").concat(h + 1, ":").concat(min + 3 - 60, ":").concat(s);
  }

  Action.find({
    timeAction: time
  }, function (err, docs) {
    if (!err) {
      for (var i = 0; i < docs.length; i++) {
        if (docs[i].timeAction && docs[i].views == 0) {
          Action.updateOne({
            timeAction: time
          }, {
            $set: {
              timeAction: timeUpdate,
              views: 1
            }
          }, function (err, doc) {
            if (!err) {// res.send(doc)
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
        }

        if (docs[i].views == 1) {
          Action.updateOne({
            serialNumber: docs[i].serialNumber
          }, {
            $set: {
              isButtonVisible: true
            }
          }, function (err, doc) {
            if (!err) {
              return;
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
        }

        Action.updateOne({
          timeAction: time
        }, {
          $set: {
            views: 2
          }
        }, function (err, doc) {
          if (!err) {// res.send(doc)
          } else {
            console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
          }
        });

        if (docs[i].views == 2) {
          UserinAuction.updateOne({
            carNumber: docs[i].serialNumber
          }, {
            $set: {
              sendEmail: true
            }
          }, function (err, doc) {
            if (!err) {// res.send(doc)
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
        }
      }
    } else {
      console.log('Error in Retriving Rent :' + JSON.stringify(err, undefined, 2));
    }
  });
}

setInterval(updateTimeAuction, 500);
module.exports = router;