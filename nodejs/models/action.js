const mongoose = require('mongoose');

 

  var Action = mongoose.model('Action', {
    timeAction:{type:String},
    maxPrice: {type:Number },
    minPrice:{type: Number},
    carPhoto: {type:String},
    carModel: {type:Number},
    carType: {type:String},
    carKM: {type:Number},
    isButtonVisible : {type:Boolean},
    views : {type:Number},


});

  module.exports = {Action}