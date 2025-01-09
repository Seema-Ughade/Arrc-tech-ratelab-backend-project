const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const upload = require('../middlewares/multer');

router.post('/', upload.single('image'), companyController.createCompany);
router.get('/', companyController.getCompanies);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', upload.single('image'), companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;

