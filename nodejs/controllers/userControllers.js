const bcrypt = require("bcrypt");
const express = require("express");
const {User} = require("../models/user");
var {Email} = require('../models/email');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;
const nodemailer = require("nodemailer");

const router = express.Router();
// The function extracts the users from the users DB
router.get('/users', (req, res) => {
    User.find().sort({ username: -1 }).exec(function(err, docs) {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
});
// The function extracts the user from the users DB
router.get('/users/shearchofemail', (req, res) => {

  const email = req.query.email;
  User.find({email:email},function(err,response){
      if(err)
      res.send(err);
      else
      res.send(response)
  })
});

//The function checks that the entered details meet the conditions, if so, then sends a Response message with the entered details and everything is fine, if not, sends an error message.
router.post("/users/signup", async (req, res) => {
    const body = req.body;

    if (!( body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }
    const user = new User(body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));


  });
//The function checks the details he entered if they are in the DB, if so, then sends a TOKEN message that everything is good, and if not, sends an error message.
  router.post("/users/login", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        const token = jwt.sign({_id:user._id},'my_secret_key');
            res.json({
                token: token
            });

      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }

  });
// A function to add a user to the DB of users.
  router.post('/users', (req, res) => {
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
    });
    user.save((err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log('Error in car Save :' + JSON.stringify(err, undefined, 2));
      }
    });
  });

// A function to update a user in the users' DB.
  router.put('/users/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2)); }
    });
  });
// A function to delete a user from the DB of users.
  router.delete('/users/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
  });
// Sending a random number to an email
  router.post('/users/sendEmail', async (req, res) => {
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

//A function allows you to update the password in the DB
router.put('/users/newPassword/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);


  const body = req.body;
  const user = new User(body);
  const salt = await bcrypt.genSalt(10);
  let password2 = await bcrypt.hash(user.password, salt);

  var userUpdate = {
    username: req.body.username,
    email: req.body.email,
    password: password2,
    phone: req.body.phone,
  };
  User.findByIdAndUpdate(req.params.id, {
    $set: userUpdate
  }, {
    new: true
  }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2));
    }
  });
});



module.exports = router;
