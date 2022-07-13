var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  name : {
    type: String,
    required : true
  },
  program : {
    type: String,
    required : true
  },
  location: {
    type: String,
    required : true
  },
  rep_name : {
    type: String,
    required : true
  },
  beneficiary_18: {
    type: Number,
    required: true
  },
  beneficiary_60: {
    type: Number,
    required: true
  },
  beneficiary_female: {
    type: Number,
    required: true
  },
  rep_id: {
    type: Number,
    required: true
  },
  amount_kgs: {
    type: Number,
    required: true
  },
  beneficiary_total: {
    type: Number,
    required: true
  },
  food_distributed: {
    type: String,
    required: true }
});

module.exports = mongoose.model('Data', dataSchema);