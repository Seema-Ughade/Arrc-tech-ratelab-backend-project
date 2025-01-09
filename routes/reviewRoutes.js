// const express = require('express');
// const router = express.Router();
// const reviewController = require('../controllers/reviewController');

// router.get('/', reviewController.getAllReviews);
// router.post('/', reviewController.createReviews);
// router.delete('/:id', reviewController.deleteReview);
// router.delete('/', reviewController.deleteAllReviews);

// module.exports = router;


const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);
router.post('/', reviewController.createOrUpdateReviews);
router.delete('/:id', reviewController.deleteReview);
router.delete('/', reviewController.deleteAllReviews);

module.exports = router;

