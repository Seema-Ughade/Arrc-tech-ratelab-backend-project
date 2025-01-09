const express = require('express');
const { dbConnect } = require('../config/dbConnection');

const userRoutes = require('../routes/userRoutes');
const adminRoutes = require('../routes/adminRoutes');
const reviewRoutes = require('../routes/reviewRoutes');
const categoryRoutes = require('../routes/categoryRoutes')
const advertisementRoutes = require('../routes/advertisementRoutes');
const contactRoutes = require('../routes/contactRoutes');
const companyRoutes = require('../routes/companyRoutes');


const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || '0.0.0.0';

const app = express();

dbConnect();

// Enable CORS for all routes

app.use(cors());

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/auth', adminRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes)
app.use('/api/advertisements', advertisementRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/companies', companyRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

// give backend for this form give controller model route and index.js file code for this give updated code 
