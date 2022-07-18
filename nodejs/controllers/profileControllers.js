const { profile } = require('console');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Profile } = require('../models/profile');

router.get('/profile', (req, res) => {
    Profile.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving profile :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/profile/:email', (req, res) => {
    const email = req.params.email;
    Profile.find({
      email: email
    }, function (err, response) {
      if (err)
        res.send(err);
      else
        res.send(response)
    })
  });

  router.post('/profile', async (req, res) => {
    const car= await Profile.findOne({car: req.body.car});
    console.log(car);
    if(!car){
    var profile = new Profile({
        email: req.body.email,
        car: req.body.car,

    });
    profile.save((err, doc) => {
    if (!err) { res.send(doc); }
        else { console.log('Error in message Save :' + JSON.stringify(err, undefined, 2)); }
        });
      }
});
module.exports = router;