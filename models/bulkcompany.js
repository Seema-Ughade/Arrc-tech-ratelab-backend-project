// const mongoose = require('mongoose');

// const companySchema = new mongoose.Schema({
//   companyName: { type: String, required: true },
//   userName: { type: String, required: true },
//   email: { type: String, required: true },
//   url: { type: String },
//   category: { type: String },
//   address: { type: String },
//   tags: [String],
//   description: { type: String },
//   imageUrl: { type: String },
//   status: { type: String, default: 'Pending' },
// }, { timestamps: true });

// const reviewSchema = new mongoose.Schema({
//   excelId: { type: Number },
//   reviewer: { type: String, required: true },
//   username: { type: String },
//   company: { type: String, required: true },
//   review: { type: String, required: true },
//   fullReview: { type: String },
//   rating: { type: Number, min: 0, max: 5 },
// }, { timestamps: true });

// const Company = mongoose.model('BulkCompany', companySchema);
// const Review = mongoose.model('BulkReview', reviewSchema);

// module.exports = { Company, Review };
const mongoose = require('mongoose');

// Company Schema
const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  url: { type: String },
  category: { type: String },
  address: { type: String },
  tags: [String],
  description: { type: String },
  imageUrl: { type: String },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
}, { timestamps: true });

// Bulk Company Schema
const bulkCompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  url: { type: String },
  category: { type: String },
  address: { type: String },
  tags: [String],
  description: { type: String },
  imageUrl: { type: String },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
}, { timestamps: true });

// Review Schema
const reviewSchema = new mongoose.Schema({
  excelId: { type: Number },
  reviewer: { type: String, required: true },
  username: { type: String },
  company: { type: String, required: true },
  review: { type: String, required: true },
  fullReview: { type: String },
  rating: { type: Number, min: 0, max: 5 },
}, { timestamps: true });

// Models
const Company = mongoose.model('Bulk by Company', companySchema);
const BulkCompany = mongoose.model('BulkCompany', bulkCompanySchema);
const Review = mongoose.model('BulkReview', reviewSchema);

// Export Models
module.exports = {
  Company,
  BulkCompany,
  Review
};
