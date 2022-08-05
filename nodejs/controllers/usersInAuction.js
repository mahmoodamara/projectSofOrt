const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const nodemailer = require("nodemailer");


var {
  UserinAuction
} = require('../models/usersInAuction');
var {
  Email
} = require('../models/email');
var {
  Action
} = require('../models/action');

// => localhost:3000/Action/
router.get('/usersaction', (req, res) => {
  UserinAuction.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving UserinAuction :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.get('/usersaction/:carNumber', (req, res) => {
  UserinAuction.find({carNumber:req.params.carNumber},(err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving UserinAuction :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.get('/maxUsersaction/:carNumber', async (req, res) => {
  const carNumber = await UserinAuction.find({
    carNumber: req.params.carNumber
  }).sort({
    bidValue: -1
  }).limit(1).exec(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
    }
  });
});


router.get('/sendEmail', (req, res) => {
  Email.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving emails :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.post('/sendEmail', async (req, res) => {
  let max = 10000;
  let min = 1000;
  let rand = Math.floor(Math.random() * (max - min + 1) + min);
  var ac = new Email({
    email: req.body.email,
    rand: rand,
  });
  const {
    email
  } = req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'testamara144141@gmail.com', // ethereal user
      pass: 'izqjinswvbsmprez', // ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: 'RentBuy',
    to: `${email}`,
    subject: 'Sending Email using Node.js from RentBuy',
    text: `the rand is ${rand}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log('the random is' + rand)
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


router.post('/usersaction', async (req, res) => {
  car = await UserinAuction.findOne({
    carNumber: req.body.carNumber,
    email: req.body.email
  });
  if (!car) {
    var ac = new UserinAuction({
      email: req.body.email,
      bidValue: req.body.bidValue,
      carNumber: req.body.carNumber,
      Action: req.body.Action
    });
    ac.save((err, doc) => {
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
    }, (err, doc) => {
      if (!err) {
        return;
      } else {
        console.log('Error in Rent Update :' + JSON.stringify(err, undefined, 2));
      }
    });
  }
});

router.delete('/sendEmail/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Email.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Email Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.post('/sendEmailWinner', async (req, res) => {
  const {
    email
  } = req.body;
  var ac = new Email({
    email: req.body.email,
  });
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'testamara144141@gmail.com', // ethereal user
      pass: 'izqjinswvbsmprez', // ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: 'RentBuy',
    to: `${email}`,
    subject: 'Sending Email using Node.js from RentBuy',
    text: `you are winner in the auction`
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


function updateTimeAuction() {


  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();

  const h = new Date().getHours();
  const min = new Date().getMinutes();
  const s = new Date().getSeconds();

  time = `${m} ${d},${y} ${h}:${min}:${s}`;



  if (min + 3 < 60) {
    timeUpdate = `${m} ${d},${y} ${h}:${min+3}:${s}`;
  }
  if (min + 3 >= 60) {
    timeUpdate = `${m} ${d},${y} ${h+1}:${(min+3)-60}:${s}`;
  }

  //timeUpdate = `${y}-${m}-${d}T${h}:${min+3}:${s}`;

  Action.find({
    timeAction: time
  }, (err, docs) => {
    if (!err) {
      for (let i = 0; i < docs.length; i++) {
        UserinAuction.find({carNumber: docs[i].serialNumber,views:2}).sort({
          bidValue: -1
        }).limit(1).exec(function (err, doc) {


          for (let i = 0; i < doc.length; i++) {

            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: 'testamara144141@gmail.com', // ethereal user
                pass: 'izqjinswvbsmprez', // ethereal password
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            var mailOptions = {
              from: 'RentBuy',
              to: doc[i].email,
              subject: 'Sending Email using Node.js from RentBuy',
              text: `you are winner in the auction`
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
        })
      }
    } else {
      console.log('Error in Retriving Rent :' + JSON.stringify(err, undefined, 2));
    }
  });
}

setInterval(updateTimeAuction, 1000);



module.exports = router;
