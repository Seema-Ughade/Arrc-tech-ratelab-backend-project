const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   agreeToTerms: { type: Boolean, required: true },
//   role: {
//     type: String,
//     default: 'user', // Set default to 'user'
//   },

// }, { timestamps: true });

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// module.exports = mongoose.model('User', userSchema);


// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({
// //   firstName: { type: String, required: true },
// //   lastName: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   mobile: { type: String },
// //   country: { type: String },
// //   address: { type: String },
// //   city: { type: String },
// //   state: { type: String },
// //   zipCode: { type: String },
// //   emailVerified: { type: Boolean, default: false },
// //   mobileVerified: { type: Boolean, default: false },
// //   role: { type: String, enum: ['user', 'admin'], default: 'user' },
// //   hasCompanies: { type: Boolean, default: false },
// //   joinedAt: { type: Date, default: Date.now },
// // }, { timestamps: true });

// // module.exports = mongoose.model('User', userSchema);

