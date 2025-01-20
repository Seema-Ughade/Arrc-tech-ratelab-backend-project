const express = require('express');
const { dbConnect } = require('../config/dbConnection');
const { transporter, emailFrom } = require('../utils/sendEmail');

const userRoutes = require('../routes/userRoutes');
const adminRoutes = require('../routes/adminRoutes');
const reviewRoutes = require('../routes/reviewRoutes');
const categoryRoutes = require('../routes/categoryRoutes')
const advertisementRoutes = require('../routes/advertisementRoutes');
const contactRoutes = require('../routes/contactRoutes');
const companyRoutes = require('../routes/companyRoutes');
const blogroutes = require('../routes/blogroutes');
const bulkcompanyroute = require('../routes/bulkcompanyroute');


const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');
dotenv.config();

const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || '0.0.0.0';

const app = express();

dbConnect();

// Enable CORS for all routes

app.use(cors());

app.use(express.json());

// Email service configuration
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS
//     }
//   });
    
//   // Make transporter available to routes
//   app.set('emailTransporter', transporter);
  
//   // Set static email from address
//   app.set('emailFrom', 'noreply@yourcompany.com');
app.set('emailTransporter', transporter);

// Set static email from address
app.set('emailFrom', emailFrom);

app.use('/api', userRoutes);
app.use('/api/auth', adminRoutes);

app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes)
app.use('/api/advertisements', advertisementRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/posts', blogroutes);
app.use('/api', bulkcompanyroute);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

// give backend for this form give controller model route and index.js file code for this give updated code 
