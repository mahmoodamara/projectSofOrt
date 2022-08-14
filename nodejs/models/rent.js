const mongoose = require('mongoose');



  var Rent = mongoose.model('Rent', {
    serialNumber:{type:Number},
    img: {type:String },
    type:{type: String},
    KM: {type:Number},
    price : {type:Number},
     rent: [{
      email:{type:String},
      checkIn:{type:String},
      checkOut:{type:String},
      location : {type:String},
      sendEmail : {type:Boolean},

       }],


});

  module.exports = {Rent}
