const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisementController');
const upload = require('../middlewares/multer');

router.get('/', advertisementController.getAllAdvertisements);
router.post('/', upload.single('image'), advertisementController.createAdvertisement);
router.put('/:id', upload.single('image'), advertisementController.updateAdvertisement);
router.delete('/:id', advertisementController.deleteAdvertisement);
router.patch('/:id', advertisementController.updateAdvertisementStatus);

module.exports = router;