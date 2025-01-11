const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  featureImage: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
//   views: {
//     type: Number,
//     default: 0
//   }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', postSchema);