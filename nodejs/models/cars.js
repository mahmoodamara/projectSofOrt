const mongoose = require('mongoose');



  var Cars = mongoose.model('Cars', {
    serialNumber:{type:Number},
    img: {type:String },
    type:{type: String},
    manufacturer: {type:String},
    yearOfManufacture: {type:Number},
    model: {type:String},
    horsePower: {type:Number},
    engineCapacity : {type:Number},
    fuelType: {type:String},
    KM: {type:Number},
    price : {type:Number},
    views : {type:Number},
    isShowRent:{type:Boolean},
    isRent:{type:Boolean},
    email:{type:String},
    checkIn:{type:String},
    checkOut:{type:String},
    isShow:{type:Boolean},
    timeRent:{type:String},
    carInspectionDate:{type:String},
    carInspect:{type:Boolean},
    carService:{type:Boolean}


});

  module.exports = {Cars}
