// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   excelId: {
//     type: Number,
//     required: true
//   },
//   reviewer: {
//     type: String,
//     required: true
//   },
//   username: {
//     type: String,
//     required: true
//   },
//   company: {
//     type: String,
//     required: true
//   },
//   review: {
//     type: String,
//     required: true
//   },
//   fullReview: {
//     type: String,
//     required: true
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 5,
//     validate: {
//       validator: function(v) {
//         return v >= 0 && v <= 5;
//       },
//       message: props => `${props.value} is not a valid rating! Rating must be between 0 and 5.`
//     }
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Review', reviewSchema);


const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  excelId: {
    type: Number,
    required: true
  },
  reviewer: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  fullReview: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    validate: {
      validator: function(v) {
        return v >= 0 && v <= 5;
      },
      message: props => `${props.value} is not a valid rating! Rating must be between 0 and 5.`
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

