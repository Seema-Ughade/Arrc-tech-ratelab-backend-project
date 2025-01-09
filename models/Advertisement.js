const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'script'],
    required: true
  },
  size: {
    type: String,
    required: true
  },
  redirectUrl: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['enable', 'disable'],
    default: 'enable'
  },
  impression: {
    type: Number,
    default: 0
  },
  click: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Advertisement', advertisementSchema);