const mongoose = require('mongoose');

 

  var EmailCarInspectionDate = mongoose.model('EmailCarInspectionDate', {
    email:{type:String},
    car:{type:Object},


});

  module.exports = {EmailCarInspectionDate}