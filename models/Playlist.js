const mongoose = require('mongoose');
const Playlist= mongoose.Schema({
    userID : {type:String,unique:true},
    name : {type:String},
    tracks:{type:Array,default:[]},
    timestamp:{type:String}
  
  });

module.exports = mongoose.model('playlist',Playlist);