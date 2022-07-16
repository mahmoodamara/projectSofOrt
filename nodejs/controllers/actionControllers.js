const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Action } = require('../models/action');

// => localhost:3000/Action/
router.get('/action', (req, res) => {
    Action.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Action :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/action', (req, res) => {
    var ac = new Action({
        timeAction: req.body.timeAction,
        maxPrice: req.body.maxPrice,
        minPrice: req.body.minPrice,
        carPhoto: req.body.carPhoto,
        carModel: req.body.carModel,
        carType: req.body.carType,
        carKM: req.body.carKM,
        isButtonVisible : req.body.isButtonVisible ,
        views : req.body.views


    });
    ac.save((err, doc) => {
    if (!err) { res.send(doc); }
        else { console.log('Error in Action Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/action/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    var ac = {
        timeAction: req.body.timeAction,
        maxPrice: req.body.maxPrice,
        minPrice: req.body.minPrice,
        carPhoto: req.body.carPhoto,
        carModel: req.body.carModel,
        carType: req.body.carType,
        carKM: req.body.carKM,
        isButtonVisible : req.body.isButtonVisible ,
        views : req.body.views
    };
    Action.findByIdAndUpdate(req.params.id, { $set: ac }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Auction Update :' + JSON.stringify(err, undefined, 2)); }
    });
  });

router.delete('/action', (req, res) => {

    Action.deleteMany((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Auction Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;