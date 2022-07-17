const mongoose = require('mongoose');



  var Rent = mongoose.model('Rent', {
    serialNumber:{type:Number},
     rent: [{
      email:{type:String},
      checkIn:{type:String},
      checkOut:{type:String},
      location : {type:String},
       }],


});

  module.exports = {Rent}
