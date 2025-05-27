const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registeruser',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
 
});

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
