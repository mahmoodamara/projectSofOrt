"use strict";

var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var nodemailer = require("nodemailer");

var _require = require('../models/cars'),
    Cars = _require.Cars;

var _require2 = require('../models/emailCarInspectionDate'),
    EmailCarInspectionDate = _require2.EmailCarInspectionDate;

var _require3 = require('../models/carTreatment'),
    Treatment = _require3.Treatment;

var _require4 = require('../models/rent'),
    Rent = _require4.Rent; // The function retrieves all vehicles from the Cars DB.


router.get('/cars', function (req, res) {
  Cars.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Cars :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // The function retrieves the 4 vehicles that were rented on the site from the Cars DB

router.get('/maxViewsCar', function (req, res) {
  Cars.find().sort({
    views: -1
  }).limit(4).exec(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
    }
  });
});
router.get('/cars/serialNumber', function (req, res) {
  var serialnumber = req.query.serialNumber;
  Cars.find({
    serialNumber: serialnumber
  }, function (err, response) {
    if (err) res.send(err);else res.send(response);
  });
}); //The function retrieves the vehicles by category from the Cars DB

router.get('/cars/manufacturer', function (req, res) {
  var manufacturer = req.query.manufacturer;
  Cars.find({
    manufacturer: manufacturer
  }, function (err, response) {
    if (err) res.send(err);else res.send(response);
  });
}); // A function allows you to add a new car to the DB

router.post('/cars', function (req, res) {
  var car = new Cars({
    serialNumber: req.body.serialNumber,
    img: req.body.img,
    type: req.body.type,
    manufacturer: req.body.manufacturer,
    yearOfManufacture: req.body.yearOfManufacture,
    model: req.body.model,
    horsePower: req.body.horsePower,
    engineCapacity: req.body.engineCapacity,
    fuelType: req.body.fuelType,
    KM: req.body.KM,
    price: req.body.price,
    views: 0,
    isRent: false,
    carInspectionDate: req.body.carInspectionDate,
    carInspect: false,
    carService: false
  });
  car.save(function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in car Save :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function allows updating an existing car in the DB

router.put('/cars/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var car = {
    serialNumber: req.body.serialNumber,
    img: req.body.img,
    type: req.body.type,
    manufacturer: req.body.manufacturer,
    yearOfManufacture: req.body.yearOfManufacture,
    model: req.body.model,
    horsePower: req.body.horsePower,
    engineCapacity: req.body.engineCapacity,
    fuelType: req.body.fuelType,
    KM: req.body.KM,
    price: req.body.price,
    views: req.body.views,
    isRent: req.body.isRent,
    carInspectionDate: req.body.carInspectionDate,
    carInspect: req.body.carInspect,
    carService: req.body.carService
  };
  Cars.findByIdAndUpdate(req.params.id, {
    $set: car
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in car Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function that allows deleting an existing car from DB

router["delete"]('/cars/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Cars.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function updates the service date for each vehicle and sends a dispatch message to the lot manager for it.

function timer() {
  var d = new Date().getDate();
  var m = new Date().getMonth() + 1;
  var y = new Date().getFullYear();
  var time = "".concat(y, "-").concat(m, "-").concat(d);
  var timeEmail = "".concat(y, "-").concat(m, "-").concat(d + 3);

  if (m == 1 && d + 3 > 31) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 2 && d + 3 > 28 || d + 3 > 29) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 3 && d + 3 > 31) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 4 && d + 3 > 30) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 5 && d + 3 > 31) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 6 && d + 3 > 30) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 7 && d + 3 > 31) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 8 && d + 3 < 31) {
    timeEmail = "".concat(y, "-0").concat(m, "-").concat(d + 3);
  }

  if (m == 9 && d + 3 > 30) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 10 && d + 3 > 31) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 11 && d + 3 > 30) {
    timeEmail = "".concat(y, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  if (m == 12 && d + 3 > 31) {
    timeEmail = "".concat(y + 1, "-").concat(m + 1, "-").concat(d + 3 - d);
  }

  var timeIns;

  if (!(m + 6 > 12)) {
    timeIns = "".concat(y, "-").concat(m + 6, "-").concat(d + 3 - d);
  } else {
    timeIns = "".concat(y + 1, "-").concat(m + 6 - 12, "-").concat(d + 3 - d);
  }

  Rent.find({
    "rent.checkIn": timeEmail
  }, function (err, docs) {
    if (!err) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var rent = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = rent.rent[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var re = _step2.value;

              if (re.sendEmail == false) {
                Rent.updateOne({
                  "rent.email": re.email
                }, {
                  $set: {
                    "rent.$.sendEmail": true
                  }
                }, function (err, doc) {
                  if (!err) {} else {
                    console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                  }
                });
                var transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: 'testamara144141@gmail.com',
                    pass: 'izqjinswvbsmprez'
                  },
                  tls: {
                    rejectUnauthorized: false
                  }
                });
                var mailOptions = {
                  from: 'RentBuy',
                  to: "".concat(re.email),
                  subject: 'Sending Email using Node.js from RentBuy',
                  text: "".concat(timeEmail, " ")
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
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  });
  Cars.find({
    carInspectionDate: timeEmail
  }, function (err, docs) {
    if (!err) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = docs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var ac = _step3.value;

          if (ac.carInspect == false) {
            var treatment = new Treatment({
              car: ac
            });
            treatment.save(function (err, doc) {
              if (!err) {
                console.log("save");
              } else {
                console.log('Error in home Save :' + JSON.stringify(err, undefined, 2));
              }
            });
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: 'testamara144141@gmail.com',
                pass: 'izqjinswvbsmprez'
              },
              tls: {
                rejectUnauthorized: false
              }
            });
            var mailOptions = {
              from: 'RentBuy',
              to: 'mahmoodamara2@gmail.com',
              subject: 'Sending Email using Node.js from RentBuy',
              text: "".concat(timeEmail, " of ").concat(ac.manufacturer)
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

          Cars.updateOne({
            _id: ac._id
          }, {
            $set: {
              carInspect: true,
              carInspectionDate: timeIns
            }
          }, function (err, doc) {
            if (!err) {// res.send(doc)
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    } else {
      console.log('Error in Retriving Cars :' + JSON.stringify(err, undefined, 2));
    }
  });
  Cars.find({
    carInspectionDate: time
  }, function (err, docs) {
    if (!err) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = docs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var car = _step4.value;

          if (car.carService == false) {
            Cars.updateOne({
              serialNumber: car.serialNumber
            }, {
              $set: {
                carService: true
              }
            }, function (err, doc) {
              if (!err) {// res.send(doc)
              } else {
                console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
              }
            });
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  });
}

setInterval(timer, 1000);
module.exports = router;