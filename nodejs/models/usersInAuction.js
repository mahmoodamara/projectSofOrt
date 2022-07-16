const mongoose = require('mongoose');

 


// var ac = JSON.stringify(Action);
  var UserinAuction = mongoose.model('UserinAuction', {
    email: {type:String },
    bidValue: {type:Number},
    action:{type:Object}
});

  module.exports = {UserinAuction}