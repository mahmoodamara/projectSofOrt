const mongoose = require('mongoose');
var Contact = mongoose.model('Contact', {
    title:{type:String},
    description: { type: String },
    insta: { type: String },
    facebook: { type: String },
    twitter: { type: String},
    address1: { type: String},
    address2: { type: String},
    phone: { type: String},
    mail: { type: String},
    clock: { type: String}



});

module.exports = { Contact };