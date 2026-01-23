const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'wishlist'
  },
  dateAdded: {
    type: Date,          
    default: Date.now    //Automatically sets the time
  }
});

module.exports = mongoose.model('Job', JobSchema);