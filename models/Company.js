// // const mongoose = require('mongoose');

// // const CompanySchema = new mongoose.Schema({
// //   companyName: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   category: {
// //     type: String,
// //     required: true
// //   },
// //   url: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     trim: true,
// //     lowercase: true
// //   },
// //   address: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   tags: [{
// //     type: String,
// //     trim: true
// //   }],
// //   description: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   imageUrl: {
// //     type: String,
// //     required: true
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // module.exports = mongoose.model('Company', CompanySchema);



// const mongoose = require('mongoose');

// const CompanySchema = new mongoose.Schema({
//   companyName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   category: {
//     type: String,
//     required: true
//   },
//   url: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true
//   },
//   address: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   tags: [{
//     type: String,
//     trim: true
//   }],
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   imageUrl: {
//     type: String,
//     required: true
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   userName: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Company', CompanySchema);


const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  tags: [String],
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
