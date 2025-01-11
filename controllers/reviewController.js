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

exports.getAllReviewsbyId = async (req, res) => {
  try {
    const companyId = req.params.id;
    const reviews = await Review.find({ company: companyId }).populate('user', 'username').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


async function updateCompanyRating(companyId) {
  const reviews = await Review.find({ company: companyId });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  await Company.findByIdAndUpdate(companyId, { rating: averageRating });
}




exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const companyId = req.params.id;
    const userId = req.user.id; // Assuming you have user info in req.user after authentication

    const newReview = new Review({
      user: userId,
      company: companyId,
      rating,
      comment
    });

    const savedReview = await newReview.save();

    // Update company's average rating
    await updateCompanyRating(companyId);

    const populatedReview = await Review.findById(savedReview._id).populate('user', 'username');
    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if the user is authorized to delete this review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.id);

    // Update company's average rating
    await updateCompanyRating(review.company);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
    
    await updateCompanyRating(updatedReview.company);
    
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


async function updateCompanyRating(companyId) {
  const reviews = await Review.find({ company: companyId });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  await Company.findByIdAndUpdate(companyId, { rating: averageRating });
}

