const mongoose = require('mongoose');
var Message = mongoose.model('Message', {
    name:{type:String},
    email: { type: String },
    subject: { type: String },
    message: { type: String },



});

module.exports = { 
    Message:Message };