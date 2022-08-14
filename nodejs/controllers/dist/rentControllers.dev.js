"use strict";

var express = require('express');

var _require = require('rxjs'),
    asyncScheduler = _require.asyncScheduler;

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var _require2 = require('../models/rent'),
    Rent = _require2.Rent;

var _require3 = require('../models/cars'),
    Cars = _require3.Cars; // The function retrieves rented vehicles from the Rents DB


router.get('/rent', function (req, res) {
  Rent.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Rent :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function that retrieves the vehicle according to the rental serial number from the Rents DB

router.get('/rent/serialNumber', function (req, res) {
  var serialnumber = req.query.serialNumber;
  Rent.find({
    serialNumber: serialnumber
  }, function (err, response) {
    if (err) res.send(err);else res.send(response);
  });
}); // A function to add Rent to the Rent DB.

router.post('/rent', function _callee(req, res) {
  var rentOne, rent;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Rent.findOne({
            serialNumber: req.body.serialNumber
          }));

        case 2:
          rentOne = _context.sent;
          rent = new Rent({
            serialNumber: req.body.serialNumber,
            img: req.body.img,
            type: req.body.type,
            KM: req.body.KM,
            price: req.body.price
          });
          rentUser = {
            email: req.body.email,
            checkOut: req.body.checkOut,
            checkIn: req.body.checkIn,
            location: req.body.location,
            sendEmail: false
          };
          rent.rent.push(rentUser);

          if (!rentOne) {
            rent.save(function (err, doc) {
              if (!err) {
                res.send(doc);
              } else {
                console.log('Error in Rent Save :' + JSON.stringify(err, undefined, 2));
              }
            });
          } else {
            Rent.updateOne({
              serialNumber: req.body.serialNumber
            }, {
              $push: {
                rent: rentUser
              }
            }, function (err, doc) {
              if (!err) {
                res.send(doc);
              } else {
                console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2));
              }
            });
          }

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}); // A function to update Rent in the Rent DB.

router.put('/rent/:email', function (req, res) {
  rentUser = {
    email: req.body.email,
    checkOut: req.body.checkOut,
    checkIn: req.body.checkIn,
    location: req.body.location
  };
  Rent.findOneAndUpdate({
    "rent.email": req.params.email
  }, {
    '$set': {
      'rent.$': rentUser
    }
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // A function to update the rental statuses for each vehicle according to the time the vehicle was rented and returned.

function updateRent() {
  var d = new Date().getDate();
  var m = new Date().getMonth() + 1;
  var y = new Date().getFullYear();
  var h = new Date().getHours();
  var min = new Date().getMinutes();
  var s = new Date().getSeconds();
  var time;

  if (d < 10 && m < 10) {
    time = "".concat(y, "-0").concat(m, "-0").concat(d);
  }

  if (d >= 10 && m < 10) {
    time = "".concat(y, "-0").concat(m, "-").concat(d);
  }

  if (d < 10 && m > 10) {
    time = "".concat(y, "-").concat(m, "-0").concat(d);
  }

  if (d >= 10 && m >= 10) {
    time = "".concat(y, "-").concat(m, "-").concat(d);
  } //console.log(time)


  Rent.find({
    "rent.checkIn": time
  }, function (err, docs) {
    if (!err) {
      var _loop = function _loop(i) {
        for (var j = 0; j < docs[i].rent.length; j++) {
          if (docs[i].rent[j].checkIn == time) {
            if (h >= 10 && h < 18) {
              Cars.updateOne({
                serialNumber: docs[i].serialNumber
              }, {
                $set: {
                  isRent: true
                }
              }, function (err, doc) {
                if (!err) {} else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });
            }
          }

          if (docs[i].rent[j].checkOut == time) {
            if (h >= 18 && h < 24) {
              Cars.updateOne({
                serialNumber: docs[i].serialNumber
              }, {
                $set: {
                  isRent: false
                }
              }, function (err, doc) {
                if (!err) {
                  return;
                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });
              Rent.updateOne({
                serialNumber: docs[i].serialNumber
              }, {
                $set: {
                  "rent.$.sendEmail": false
                }
              }, function (err, doc) {
                if (!err) {
                  return;
                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });
              Rent.findOneAndUpdate({
                serialNumber: docs[i].serialNumber
              }, {
                $pull: {
                  rent: {
                    email: docs[i].rent[j].email
                  }
                }
              }, {
                "new": true
              }, function (err, doc) {
                if (!err) {
                  if (docs[i].rent.length == 0) {
                    Cars.updateOne({
                      serialNumber: docs[i].serialNumber
                    }, {
                      $set: {
                        isRent: false
                      }
                    }, function (err, doc) {
                      if (!err) {
                        return;
                      } else {
                        console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                      }
                    });
                    Rent.findOneAndRemove({
                      serialNumber: docs[i].serialNumber
                    }, function (err, doc) {
                      if (!err) {
                        res.send(doc);
                      } else {
                        console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
                      }
                    });
                  }
                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });
            }
          }
        }
      };

      for (var i = 0; i < docs.length; i++) {
        _loop(i);
      }
    } else {
      console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
  Rent.find({
    "rent.checkOut": time
  }, function (err, docs) {
    if (!err) {
      for (var i = 0; i < docs.length; i++) {
        for (var j = 0; j < docs[i].rent.length; j++) {
          // if (docs[i].rent[j].checkIn == time) {
          //   if (h >= 10 && h < 18) {
          //     Cars.updateOne({
          //       serialNumber: docs[i].serialNumber
          //     }, {
          //       $set: {
          //         isRent: true
          //       }
          //     }, (err, doc) => {
          //       if (!err) {
          //       } else {
          //         console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
          //       }
          //     });
          //   }
          // }
          if (docs[i].rent[j].checkOut == time) {
            if (h >= 16 && h < 24) {
              Cars.updateOne({
                serialNumber: docs[i].serialNumber
              }, {
                $set: {
                  isRent: false
                }
              }, function (err, doc) {
                if (!err) {
                  return;
                } else {
                  console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
                }
              });
            }
          }

          Rent.findOneAndUpdate({
            "rent.email": docs[i].rent[j].email
          }, {
            '$set': {
              'rent.$.sendEmail': false
            }
          }, function (err, doc) {
            if (!err) {
              console.log(doc);
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
          Rent.findOneAndUpdate({
            serialNumber: docs[i].serialNumber
          }, {
            $pull: {
              rent: {
                email: docs[i].rent[j].email
              }
            }
          }, {
            "new": true
          }, function (err, doc) {
            if (!err) {} else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
        }
      }
    } else {
      console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
  Rent.find({}, function (err, docs) {
    if (!err) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = docs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var car = _step.value;

          if (car.rent.length == 0) {
            Cars.updateOne({
              serialNumber: car.serialNumber
            }, {
              $set: {
                isRent: false
              }
            }, function (err, doc) {
              if (!err) {
                console.log(doc);
              } else {
                console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
              }
            });
            Rent.findOneAndRemove({
              serialNumber: car.serialNumber
            }, function (err, doc) {
              if (!err) {
                return;
              } else {
                console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
              }
            });
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
}

setInterval(updateRent, 1000); // Function to delete a user from renting a car.

router.get('/rent/:serialNumber/:email', function (req, res) {
  Rent.findOneAndUpdate({
    serialNumber: req.params.serialNumber
  }, {
    $pull: {
      rent: {
        email: req.params.email
      }
    }
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      if (doc.rent.length == 0) {
        Rent.findOneAndRemove({
          serialNumber: req.params.serialNumber
        }, function (err, doc) {
          if (!err) {
            res.send(doc);
          } else {
            console.log('Error in Rent Delete :' + JSON.stringify(err, undefined, 2));
          }
        });
      }
    } else {
      console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
    }
  });
});
router["delete"]('/rent/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Rent.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
      Cars.updateOne({
        serialNumber: doc.serialNumber
      }, {
        $set: {
          isRent: false
        }
      }, function (err, doc) {
        if (!err) {
          return;
        } else {
          console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
        }
      });
    } else {
      console.log('Error in Rent Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});
module.exports = router;