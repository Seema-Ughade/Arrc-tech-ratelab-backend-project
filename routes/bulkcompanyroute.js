const express = require('express');
const router = express.Router();
const reviewCompanyController = require('../controllers/BulkCompanycontroller');
const upload = require('../middlewares/multer');

router.post('/bulkcompanies', reviewCompanyController.createCompany);
router.get('/bulkcompanies', reviewCompanyController.getCompanies);
router.delete('/bulkcompanies', reviewCompanyController.deleteAllCompanies);

router.post('/bulkreviews', reviewCompanyController.createReview);
router.get('/bulkreviews', reviewCompanyController.getReviews);
router.delete('/bulkreviews/:id', reviewCompanyController.deleteReview);
router.delete('/bulkreviews', reviewCompanyController.deleteAllReviews);
router.post('/bulkcompanies/:id/approve', reviewCompanyController.approveBulkCompany);
router.post('/bulkcompanies/:id/reject', reviewCompanyController.rejectBulkCompany);

router.post('/upload', upload.single('image'), reviewCompanyController.uploadImage);

module.exports = router;

