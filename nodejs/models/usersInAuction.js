const mongoose = require('mongoose');




// var ac = JSON.stringify(Action);
  var UserinAuction = mongoose.model('UserinAuction', {
    email: {type:String },
    bidValue: {type:Number},
    carNumber:{type:Number},
    Action:{type:Object},
    sendEmail:{type:Boolean},
});

  module.exports = {UserinAuction}
