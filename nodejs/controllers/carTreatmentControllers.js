const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Treatment } = require('../models/carTreatment');


router.get('/treatment', (req, res) => {
    Treatment.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving home :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/treatment', (req, res) => {
    var treatment = new Treatment({
        car: req.body
    });
    treatment.save((err, doc) => {
    if (!err) { res.send(doc); }
        else { console.log('Error in home Save :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;