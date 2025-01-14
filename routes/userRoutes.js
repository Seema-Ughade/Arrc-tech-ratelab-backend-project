const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const { authenticateToken, authorizeRole } = require('../middlewares/auth');
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
router.post('/users/:id/send-email-verification', userController.sendEmailVerification);
router.get('/users/verify-email/:token', userController.verifyEmail);

router.post('/users/:userId/send-mobile-verification', userController.sendMobileVerification);

router.post('/users/:userId/verify-mobile', userController.verifyMobile);


// router.get('/admin/dashboard', authenticateToken, authorizeRole(['admin']), (req, res) => {
//     res.json({ message: 'Admin dashboard' });
//   });
  
//   router.get('/user/dashboard', authenticateToken, authorizeRole(['user', 'admin']), (req, res) => {
//     res.json({ message: 'User dashboard' });
//   });
module.exports = router;