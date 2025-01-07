const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
// router.get('/admin/dashboard', authenticateToken, authorizeRole(['admin']), (req, res) => {
//   res.json({ message: 'Admin dashboard' });
// });

// router.get('/user/dashboard', authenticateToken, authorizeRole(['user', 'admin']), (req, res) => {
//   res.json({ message: 'User dashboard' });
// });

module.exports = router;