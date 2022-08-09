const mongoose = require('mongoose');

var Profile = mongoose.model('Profile', {
    email: { type: String },
    car: { type: Object },
    serialNumber: { type: Number }
});

module.exports = { Profile };
