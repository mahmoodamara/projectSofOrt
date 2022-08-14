"use strict";

var bcrypt = require("bcrypt");

var express = require("express");

var _require = require("../models/user"),
    User = _require.User;

var _require2 = require('../models/email'),
    Email = _require2.Email;

var jwt = require('jsonwebtoken');

var ObjectId = require('mongoose').Types.ObjectId;

var nodemailer = require("nodemailer");

var router = express.Router(); // The function extracts the users from the users DB

router.get('/users', function (req, res) {
  User.find().sort({
    username: -1
  }).exec(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // The function extracts the user from the users DB

router.get('/users/shearchofemail', function (req, res) {
  var email = req.query.email;
  User.find({
    email: email
  }, function (err, response) {
    if (err) res.send(err);else res.send(response);
  });
}); //The function checks that the entered details meet the conditions, if so, then sends a Response message with the entered details and everything is fine, if not, sends an error message.

router.post("/users/signup", function _callee(req, res) {
  var body, user, salt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = req.body;

          if (body.email && body.password) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            error: "Data not formatted properly"
          }));

        case 3:
          user = new User(body);
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 6:
          salt = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, salt));

        case 9:
          user.password = _context.sent;
          user.save().then(function (doc) {
            return res.status(201).send(doc);
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}); //The function checks the details he entered if they are in the DB, if so, then sends a TOKEN message that everything is good, and if not, sends an error message.

router.post("/users/login", function _callee2(req, res) {
  var body, user, validPassword, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          body = req.body;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: body.email
          }));

        case 3:
          user = _context2.sent;

          if (!user) {
            _context2.next = 11;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(body.password, user.password));

        case 7:
          validPassword = _context2.sent;

          if (validPassword) {
            token = jwt.sign({
              _id: user._id
            }, 'my_secret_key');
            res.json({
              token: token
            });
          } else {
            res.status(400).json({
              error: "Invalid Password"
            });
          }

          _context2.next = 12;
          break;

        case 11:
          res.status(401).json({
            error: "User does not exist"
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // A function to add a user to the DB of users.

router.post('/users', function (req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone
  });
  user.save(function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in car Save :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function to update a user in the users' DB.

router.put('/users/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  };
  User.findByIdAndUpdate(req.params.id, {
    $set: user
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function to delete a user from the DB of users.

router["delete"]('/users/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  User.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // Sending a random number to an email

router.post('/users/sendEmail', function _callee3(req, res) {
  var max, min, rand, ac, email, transporter, mailOptions;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          max = 10000;
          min = 1000;
          rand = Math.floor(Math.random() * (max - min + 1) + min);
          ac = new Email({
            email: req.body.email,
            rand: rand
          });
          email = req.body.email;
          transporter = nodemailer.createTransport({
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
          mailOptions = {
            from: 'RentBuy',
            to: "".concat(email),
            subject: 'Sending Email using Node.js from RentBuy',
            text: "the rand is ".concat(rand)
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              console.log('the random is' + rand);
              res.send('Email Sent!');
            }
          });
          ac.save(function (err, doc) {
            if (!err) {
              res.send(doc);
            } else {
              console.log('Error in Action Save :' + JSON.stringify(err, undefined, 2));
            }
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //A function allows you to update the password in the DB

router.put('/users/newPassword/:id', function _callee4(req, res) {
  var body, user, salt, password2, userUpdate;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (ObjectId.isValid(req.params.id)) {
            _context4.next = 2;
            break;
          }

          return _context4.abrupt("return", res.status(400).send("No record with given id : ".concat(req.params.id)));

        case 2:
          body = req.body;
          user = new User(body);
          _context4.next = 6;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 6:
          salt = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, salt));

        case 9:
          password2 = _context4.sent;
          userUpdate = {
            username: req.body.username,
            email: req.body.email,
            password: password2,
            phone: req.body.phone
          };
          User.findByIdAndUpdate(req.params.id, {
            $set: userUpdate
          }, {
            "new": true
          }, function (err, doc) {
            if (!err) {
              res.send(doc);
            } else {
              console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2));
            }
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;