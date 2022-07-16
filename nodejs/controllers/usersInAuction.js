const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const nodemailer = require("nodemailer");


var {UserinAuction} = require('../models/usersInAuction');
var {Email} = require('../models/email');

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

router.get('/maxUsersaction', (req, res) => {
  UserinAuction.find().sort({bidValue:-1}).limit(1).exec(function(err, docs) {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
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
  let max =10000;
  let min = 1000;
  let rand=Math.floor(Math.random() * (max - min + 1) + min);
  var ac = new Email({
    email: req.body.email,
    rand:rand,
  });
  const {email} = req.body;

  var transporter = nodemailer.createTransport({
  service: "gmail",
    auth: {
        user: 'testamara144141@gmail.com', // ethereal user
        pass: 'izqjinswvbsmprez', // ethereal password
    },
  tls:{
    rejectUnauthorized:false
  }
});
 
var mailOptions = {
  from: 'RentBuy',
  to: `${email}`,
  subject: 'Sending Email using Node.js from RentBuy',
  text: `the rand is ${rand}`
};
 
transporter.sendMail(mailOptions, function(error, info){
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


router.post('/usersaction', (req, res) => {
  var ac = new UserinAuction({
    email: req.body.email,
    bidValue: req.body.bidValue,
    action: req.body.Action
  });
  ac.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Action Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.delete('/sendEmail/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Email.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Email Delete :' + JSON.stringify(err, undefined, 2));
     }
  });
});

router.post('/sendEmailWinner', async (req, res) => {
  const {email} = req.body;
  var ac = new Email({
    email: req.body.email,
  });
  var transporter = nodemailer.createTransport({
  service: "gmail",
    auth: {
        user: 'testamara144141@gmail.com', // ethereal user
        pass: 'izqjinswvbsmprez', // ethereal password
    },
  tls:{
    rejectUnauthorized:false
  }
});
 
var mailOptions = {
  from: 'RentBuy',
  to: `${email}`,
  subject: 'Sending Email using Node.js from RentBuy',
  text: `you are winner in the auction`
};
 
transporter.sendMail(mailOptions, function(error, info){
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



module.exports = router;
