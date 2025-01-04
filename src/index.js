const express = require('express');
const { dbConnect } = require('../config/dbConnection');

const userRoutes = require('../routes/userRoutes');
const adminRoutes = require('../routes/adminRoutes');

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



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

// give backend for this form give controller model route and index.js file code for this give updated code 
