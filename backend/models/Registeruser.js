const mongoose = require('mongoose');

const Registeruser = new mongoose.Schema({
  username: {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
  },
  password : {
    type : String,
    required: true,
  },
  confirmpassword : {
    type : String,
    required : true,
  },
  role: {
    type: String,
    enum: ['User', 'ServiceProvider', 'Admin'],
    required: true
  }
});

module.exports = mongoose.model('Registeruser', Registeruser);
