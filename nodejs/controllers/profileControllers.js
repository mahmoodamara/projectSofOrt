const { profile } = require('console');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Profile } = require('../models/profile');

// A function for retrieving the information of the logged in user

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
        serialNumber : req.body.serialNumber

    });
    profile.save((err, doc) => {
    if (!err) { res.send(doc); }
        else { console.log('Error in message Save :' + JSON.stringify(err, undefined, 2)); }
        });
      }
      else{
        res.send(err);
      }
});

//A function allows the user to delete vehicles from his profile

router.delete('/profile/:serialNumber', (req, res) => {

  Profile.findOneAndRemove({serialNumber:req.params.serialNumber}, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in profile Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;
