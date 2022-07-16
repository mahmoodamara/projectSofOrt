const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Team } = require('../models/team');

router.get('/team', (req, res) => {
    Team.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Product :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/team', (req, res) => {
    var team = new Team({
        name: req.body.name,
        job: req.body.job,
        description: req.body.description,
        photo: req.body.photo,
        insta: req.body.insta,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
    });
    team.save((err, doc) => {
    if (!err) { res.send(doc); }
        else { console.log('Error in Product Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/team/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var team = {
        name: req.body.name,
        job: req.body.job,
        description: req.body.description,
        photo: req.body.photo,
        insta: req.body.insta,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
    };
    Team.findByIdAndUpdate(req.params.id, { $set: team }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;