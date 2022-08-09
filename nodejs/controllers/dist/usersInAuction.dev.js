"use strict";

var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var nodemailer = require("nodemailer");

var _require = require('../models/usersInAuction'),
    UserinAuction = _require.UserinAuction;

var _require2 = require('../models/email'),
    Email = _require2.Email;

var _require3 = require('../models/action'),
    Action = _require3.Action; // => localhost:3000/Action/


router.get('/usersaction', function (req, res) {
  UserinAuction.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving UserinAuction :' + JSON.stringify(err, undefined, 2));
    }
  });
});
router.get('/usersaction/:carNumber', function (req, res) {
  UserinAuction.find({
    carNumber: req.params.carNumber
  }).sort({
    bidValue: -1
  }).exec(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving UserinAuction :' + JSON.stringify(err, undefined, 2));
    }
  });
});
router.get('/maxUsersaction/:carNumber', function _callee(req, res) {
  var carNumber;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(UserinAuction.find({
            carNumber: req.params.carNumber
          }).sort({
            bidValue: -1
          }).limit(1).exec(function (err, docs) {
            if (!err) {
              res.send(docs);
            } else {
              console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
            }
          }));

        case 2:
          carNumber = _context.sent;

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/sendEmail', function (req, res) {
  Email.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving emails :' + JSON.stringify(err, undefined, 2));
    }
  });
});
router.post('/usersaction', function _callee2(req, res) {
  var ac;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(UserinAuction.findOne({
            carNumber: req.body.carNumber,
            email: req.body.email
          }));

        case 2:
          car = _context2.sent;

          if (!car) {
            ac = new UserinAuction({
              email: req.body.email,
              bidValue: req.body.bidValue,
              carNumber: req.body.carNumber,
              Action: req.body.Action
            });
            ac.save(function (err, doc) {
              if (!err) {
                res.send(doc);
              } else {
                console.log('Error in Action Save :' + JSON.stringify(err, undefined, 2));
              }
            });
          } else {
            UserinAuction.updateOne({
              carNumber: req.body.carNumber,
              email: req.body.email
            }, {
              $set: {
                bidValue: req.body.bidValue
              }
            }, function (err, doc) {
              if (!err) {
                return;
              } else {
                console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
              }
            });
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router["delete"]('/sendEmail/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Email.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Email Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});

function updateWinnerInAuction() {
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
        UserinAuction.find({
          carNumber: docs[i].serialNumber,
          views: 2
        }).sort({
          bidValue: -1
        }).limit(1).exec(function (err, doc) {
          for (var _i = 0; _i < doc.length; _i++) {
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: 'testamara144141@gmail.com',
                // ethereal user
                pass: 'izqjinswvbsmprez' // ethereal password

              },
              tls: {
                rejectUnauthorized: false
              }
            });
            var mailOptions = {
              from: 'RentBuy',
              to: doc[_i].email,
              subject: 'Sending Email using Node.js from RentBuy',
              text: "you are winner in the auction"
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                res.send('Email Sent!');
              }
            });
          }
        });
      }
    } else {
      console.log('Error in Retriving  :' + JSON.stringify(err, undefined, 2));
    }
  });
}

setInterval(updateWinnerInAuction, 500);
module.exports = router;