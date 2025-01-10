// const express = require('express');
// const router = express.Router();
// const companyController = require('../controllers/companyController');
// const upload = require('../middlewares/multer');

// router.post('/', upload.single('image'), companyController.createCompany);
// router.get('/', companyController.getCompanies);
// router.get('/:id', companyController.getCompanyById);
// router.put('/:id', upload.single('image'), companyController.updateCompany);
// router.delete('/:id', companyController.deleteCompany);

// module.exports = router;


const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const upload = require('../middlewares/multer');

// Create a new company
router.post('/',  upload.single('image'), companyController.createCompany);

// Get all companies
router.get('/', companyController.getCompanies);

// Get a single company by ID
router.get('/:id', companyController.getCompanyById);

// Update a company
router.put('/:id',  upload.single('image'), companyController.updateCompany);

// Delete a company
router.delete('/:id',  companyController.deleteCompany);

// Delete all companies (be cautious with this route)
router.delete('/',  companyController.deleteAllCompanies);

// Get companies by user ID
router.get('/user/:userId',  companyController.getCompaniesByUserId);

module.exports = router;

