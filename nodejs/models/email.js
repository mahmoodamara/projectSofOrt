const mongoose = require('mongoose');

 

  var Email = mongoose.model('Email', {
    email:{type:String},
    rand:{type:Number},


});

  module.exports = {Email}