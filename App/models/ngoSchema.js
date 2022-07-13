var mongoose = require('mongoose');

var ngoSchema = new mongoose.Schema({
  name : {
    type: String,
   
  },
  program : {
    type: String,
    
  },
  email: {
    type: String,
    
    
  },
  contact : {
    type: Number,
    
  },
  password: {
    type: String,
   
  },
  passcode: {
    type: String,
   
  },
  token : {
    type: String,
    default : ""
  }
});

module.exports = mongoose.model('Ngo', ngoSchema);
