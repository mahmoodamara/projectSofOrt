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

router.get('/cars', (req, res) => {
  Cars.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Cars :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.get('/cars/sendEmailCars', (req, res) => {
  EmailCarInspectionDate.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Cars :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.get('/maxViewsCar', (req, res) => {
  Cars.find().sort({views: -1}).limit(4).exec(function (err, docs) {
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
    views: req.body.views,
    isRent: req.body.isRent,
    carInspectionDate: req.body.carInspectionDate


  });
  car.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in car Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});

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
    carInspectionDate: req.body.carInspectionDate
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

router.post('/sendEmailCarInspectionDate', async (req, res) => {
  const {
    email
  } = req.body;
  var ac = new EmailCarInspectionDate({
    email: req.body.email,
    car: req.body.car
  });
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'testamara144141@gmail.com', // ethereal user
      pass: 'Ma144141Ma', // ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: 'RentBuy',
    to: `testamara144141@gmail.com`,
    subject: 'Sending Email using Node.js from RentBuy',
    text: `There is a new car for repair soon`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email Sent!')
    }
  });
  ac.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Action Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});
var fullCar

function timer() {

  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();
  let time = `${y}-${m}-${(d)}`
  let timeEmail = `${y}-${m}-${(d+3)-d}`
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

  if (m == 8 && d + 3 > 31) {
    timeEmail = `${y}-${m+1}-${(d+3)-d}`
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
  Cars.find({
    carInspectionDate: time
  }, function (err, docs) {
    if (!err) {
      router.post('/treatment')
      var treatment = new Treatment({
        car: docs
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
          pass: 'Ma144141Ma',
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      var mailOptions = {
        from: 'RentBuy',
        to: 'testamara144141@gmail.com',
        subject: 'Sending Email using Node.js from RentBuy',
        text: `${timeEmail}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send('Email Sent!')
        }
      });

      for (let doc of docs) {

        router.put(`/cars/:${doc._id}`)
        if (!ObjectId.isValid(doc._id)) {
          console.log("err")
        }
        var car = {

          carInspectionDate: `${timeIns}`
        };
        Cars.findByIdAndUpdate(doc._id, {
          $set: car
        }, {
          new: true
        }, (err, doc) => {
          if (!err) {
            console.log(doc);
          } else {
            console.log('Error in car Update :' + JSON.stringify(err, undefined, 2));
          }
        });
      }

    } else {
      console.log('Error in Retriving Cars :' + JSON.stringify(err, undefined, 2));
    }
  });
}



//setInterval(timer,5000);


module.exports = router;
