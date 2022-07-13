var mongoose = require('mongoose');

var mainSchema = new mongoose.Schema({
  identifier : {
    type: String,
  },
  metadataHash : {
    type: String,
  },
  name:{ type:String,},
  ipaddress:{ type:String,},
  description:{ type:String,},
  macaddress:{type:String},
  value:{type:String},
});

module.exports = mongoose.model('Main', mainSchema);
