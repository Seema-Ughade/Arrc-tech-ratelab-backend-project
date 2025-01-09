// const Review = require('../models/Review');

// exports.getAllReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find().sort({ excelId: 1 });
//     res.json(reviews);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createReviews = async (req, res) => {
//   try {
//     await Review.deleteMany({}); // Clear existing reviews
//     const reviews = await Review.insertMany(req.body);
//     res.status(201).json(reviews);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteReview = async (req, res) => {
//   try {
//     const review = await Review.findByIdAndDelete(req.params.id);
//     if (!review) {
//       return res.status(404).json({ message: 'Review not found' });
//     }
//     res.json({ message: 'Review deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deleteAllReviews = async (req, res) => {
//   try {
//     await Review.deleteMany({});
//     res.json({ message: 'All reviews deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



const Review = require('../models/Review');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ excelId: 1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrUpdateReviews = async (req, res) => {
  try {
    const reviews = req.body;
    const bulkOps = reviews.map(review => ({
      updateOne: {
        filter: { excelId: review.excelId },
        update: review,
        upsert: true
      }
    }));

    await Review.bulkWrite(bulkOps);

    // Fetch and return all reviews after update
    const updatedReviews = await Review.find().sort({ excelId: 1 });
    res.status(200).json(updatedReviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAllReviews = async (req, res) => {
  try {
    await Review.deleteMany({});
    res.json({ message: 'All reviews deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

