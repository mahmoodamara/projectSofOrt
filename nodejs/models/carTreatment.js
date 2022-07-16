const mongoose = require('mongoose');

 

  var Treatment = mongoose.model('Treatment', {
   
    car:{type:Object},
});

  module.exports = {Treatment}