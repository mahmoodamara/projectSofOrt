const mongoose = require('mongoose');



  var Email = mongoose.model('Email', {
    email:{type:String},
    rand:{type:Number},
    password:{type:String},



});

  module.exports = {Email}
