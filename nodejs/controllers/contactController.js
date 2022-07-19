const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
  Contact
} = require('../models/contact');

router.get('/contacts', (req, res) => {
  Contact.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Contact :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.post('/contacts', (req, res) => {
  var contact = new Contact({
    title: req.body.title,
    description: req.body.description,
    insta: req.body.insta,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    address1: req.body.address1,
    address2: req.body.address2,
    phone: req.body.phone,
    mail: req.body.mail,
    clock: req.body.clock,


  });
  contact.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Contact Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put('/contacts/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var contact = {
    title: req.body.title,
    description: req.body.description,
    insta: req.body.insta,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    address1: req.body.address1,
    address2: req.body.address2,
    phone: req.body.phone,
    mail: req.body.mail,
    clock: req.body.clock,
  };
  Contact.findByIdAndUpdate(req.params.id, {
    $set: contact
  }, {
    new: true
  }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Contact Update :' + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;
