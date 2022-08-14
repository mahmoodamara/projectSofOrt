const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Message } = require('../models/message');
// / The function retrieves all messages from the messages DB.
router.get('/messages', (req, res) => {
    Message.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Message :' + JSON.stringify(err, undefined, 2)); }
    });
});
// The function adds the message to the Messages DB.
router.post('/messages', (req, res) => {
    var message = new Message({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,

    });
    message.save((err, doc) => {
    if (!err) { res.send(doc); }
        else { console.log('Error in message Save :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;
