const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const nodemailer = require("nodemailer");
var {
  Cars
} = require('../models/cars');
var {
  EmailCarInspectionDate
} = require('../models/emailCarInspectionDate');
var {
  Treatment
} = require('../models/carTreatment');
var {
  Rent
} = require('../models/rent');

// The function retrieves all vehicles from the Cars DB.
router.get('/cars', (req, res) => {
  Cars.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Cars :' + JSON.stringify(err, undefined, 2));
    }
  });
});


// The function retrieves the 4 vehicles that were rented on the site from the Cars DB
router.get('/maxViewsCar', (req, res) => {
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

router.get('/cars/serialNumber', (req, res) => {
  const serialnumber = req.query.serialNumber;
  Cars.find({
    serialNumber: serialnumber
  }, function (err, response) {
    if (err)
      res.send(err);
    else
      res.send(response)
  })
});
//The function retrieves the vehicles by category from the Cars DB
router.get('/cars/manufacturer', (req, res) => {
  const manufacturer = req.query.manufacturer;
  Cars.find({
    manufacturer: manufacturer
  }, function (err, response) {
    if (err)
      res.send(err);
    else
      res.send(response)
  })
});

// A function allows you to add a new car to the DB
router.post('/cars', (req, res) => {
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
  car.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in car Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});
// A function allows updating an existing car in the DB
router.put('/cars/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

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
    new: true
  }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in car Update :' + JSON.stringify(err, undefined, 2));
    }
  });
});
// A function that allows deleting an existing car from DB
router.delete('/cars/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Cars.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});


// A function updates the service date for each vehicle and sends a dispatch message to the lot manager for it.

function timer() {

  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();
  let time = `${y}-${m}-${(d)}`
  let timeEmail = `${y}-${m}-${(d+3)}`
  if (m == 1 && d + 3 > 31) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }
  if (m == 2 && d + 3 > 28 || d + 3 > 29) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }
  if (m == 3 && d + 3 > 31) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }
  if (m == 4 && d + 3 > 30) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }
  if (m == 5 && d + 3 > 31) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }
  if (m == 6 && d + 3 > 30) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }

  if (m == 7 && d + 3 > 31) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }

  if (m == 8 && d + 3 < 31) {
    timeEmail = `${y}-0${m}-${(d+3)}`
  }

  if (m == 9 && d + 3 > 30) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }

  if (m == 10 && d + 3 > 31) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }

  if (m == 11 && d + 3 > 30) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
  }

  if (m == 12 && d + 3 > 31) {
    timeEmail = `${y+1}-${m+1}-${(d+3)-d}`
  }

  let timeIns
  if (!((m + 6) > 12)) {
    timeIns = `${y}-${m+6}-${(d+3)-d}`
  } else {
    timeIns = `${y+1}-${(m+6)-12}-${(d+3)-d}`
  }

  Rent.find({
    "rent.checkIn": timeEmail
  }, function (err, docs) {
    if (!err) {
      for (let rent of docs) {
        for (let re of rent.rent) {
          if (re.sendEmail == false) {

            Rent.updateOne({
              "rent.email": re.email
            }, {
              $set: {
                "rent.$.sendEmail": true,
              }
            }, (err, doc) => {
              if (!err) {} else {
                console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
              }
            });

            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: 'testamara144141@gmail.com',
                pass: 'izqjinswvbsmprez',
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            var mailOptions = {
              from: 'RentBuy',
              to: `${re.email}`,
              subject: 'Sending Email using Node.js from RentBuy',
              text: `${timeEmail} `
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                res.send('Email Sent!')
              }
            });
          }
        }
      }
    }
  })


  Cars.find({
    carInspectionDate: timeEmail
  }, function (err, docs) {
    if (!err) {
      for (let ac of docs) {
        if (ac.carInspect == false) {
          var treatment = new Treatment({
            car: ac
          });
          treatment.save((err, doc) => {
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
              pass: 'izqjinswvbsmprez',
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          var mailOptions = {
            from: 'RentBuy',
            to: 'mahmoodamara2@gmail.com',
            subject: 'Sending Email using Node.js from RentBuy',
            text: `${timeEmail} of ${ac.manufacturer}`
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.send('Email Sent!')
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
        }, (err, doc) => {
          if (!err) {
            // res.send(doc)
          } else {
            console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
          }
        });
      }
    } else {
      console.log('Error in Retriving Cars :' + JSON.stringify(err, undefined, 2));
    }
  });

  Cars.find({
    carInspectionDate: time
  }, function (err, docs) {
    if (!err) {
      for (let car of docs) {
        if (car.carService == false) {
          Cars.updateOne({
            serialNumber: car.serialNumber
          }, {
            $set: {
              carService: true,
            }
          }, (err, doc) => {
            if (!err) {
              // res.send(doc)
            } else {
              console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
            }
          });
        }
      }
    }
  })





}



setInterval(timer, 1000);


module.exports = router;
