const express = require('express');
const { login, verifyToken } = require('../controllers/adminController'); // Import the functions
const auth = require('../middlewares/auth');  // Import auth middleware

const router = express.Router();

router.post('/login', login);
router.get('/verify', auth, verifyToken);

module.exports = router;