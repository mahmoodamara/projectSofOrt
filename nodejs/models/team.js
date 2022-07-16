const mongoose = require('mongoose');
var Team = mongoose.model('Team', {
    name:{type:String},
    job: { type: String },
    description: { type: String },
    photo: { type: String },
    insta: { type: String },
    facebook: { type: String },
    twitter: { type: String}


});

module.exports = { Team };