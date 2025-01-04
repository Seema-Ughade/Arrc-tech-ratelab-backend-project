const express = require('express');
const { login, verifyToken } = require('../controllers/adminController'); // Import the functions

const router = express.Router();

router.post('/login', login);
router.get('/verify', verifyToken);

module.exports = router;