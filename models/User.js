const mongoose = require('mongoose');
const User= mongoose.Schema({
    userID : String,
    blacklist: { type: Boolean, default: false },
  
  });

module.exports = mongoose.model('user', User);