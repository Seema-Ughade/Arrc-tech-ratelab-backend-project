const { Company, BulkCompany, Review } = require('../models/bulkcompany');
const cloudinary = require('../config/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

exports.createCompany = async (req, res) => {
  try {
    const companies = req.body;
    const createdCompanies = await Company.create(companies);
    res.status(201).json(createdCompanies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAllCompanies = async (req, res) => {
  try {
    await Company.deleteMany({});
    res.status(200).json({ message: 'All companies deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const reviews = req.body;
    const createdReviews = await Review.create(reviews);
    res.status(201).json(createdReviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
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
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAllReviews = async (req, res) => {
  try {
    await Review.deleteMany({});
    res.status(200).json({ message: 'All reviews deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const fileUri = getDataUri(file);
    const result = await cloudinary.uploader.upload(fileUri.content);
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.getBulkCompanies = async (req, res) => {
    try {
      // This is a placeholder. In a real-world scenario, you'd fetch this data from your data source.
      const bulkCompanies = [
        { companyName: 'Bulk Company 1', email: 'bulk1@example.com', category: 'Technology' },
        { companyName: 'Bulk Company 2', email: 'bulk2@example.com', category: 'Finance' },
        // Add more sample data as needed
      ];
      res.status(200).json(bulkCompanies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  exports.approveBulkCompany = async (req, res) => {
    try {
      const bulkCompany = await BulkCompany.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
  
      if (!bulkCompany) {
        return res.status(404).json({ message: 'Bulk company not found' });
      }
  
      // Create a new Company from the bulk company data
      const newCompany = new Company({
        companyName: bulkCompany.companyName,
        userName: bulkCompany.userName,
        email: bulkCompany.email,
        url: bulkCompany.url,
        category: bulkCompany.category,
        address: bulkCompany.address,
        tags: bulkCompany.tags,
        description: bulkCompany.description,
        imageUrl: bulkCompany.imageUrl,
        status: 'Approved', // Set status as 'Approved'
      });
  
      await newCompany.save();
  
      // Remove the company from the BulkCompany collection after approval
      await BulkCompany.findByIdAndDelete(req.params.id);
  
      // Send approval email
      const transporter = req.app.get('emailTransporter');
      if (!transporter) {
        console.error('Email transporter not available');
        return res.status(500).json({ message: 'Unable to send email, but company status updated' });
      }
  
      try {
        await transporter.sendMail({
          from: req.app.get('emailFrom'),
          to: bulkCompany.email,
          subject: 'Your company has been approved',
          text: `Dear ${bulkCompany.companyName},
  
  Your company has been approved. ${req.body.details}
  
  Best regards,
  Your Platform Team`
        });
      } catch (emailError) {
        console.error('Error sending approval email:', emailError);
        return res.status(200).json({ message: 'Company approved, but email could not be sent', company: newCompany });
      }
  
      res.json({ message: 'Company approved and moved to main collection', company: newCompany });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Reject a bulk company
  exports.rejectBulkCompany = async (req, res) => {
    try {
      const bulkCompany = await BulkCompany.findById(req.params.id);
      if (!bulkCompany) {
        return res.status(404).json({ message: 'Bulk company not found' });
      }
  
      // Update the status to 'Rejected'
      bulkCompany.status = 'Rejected';
      await bulkCompany.save();
  
      // Send rejection email
      const transporter = req.app.get('emailTransporter');
      if (!transporter) {
        console.error('Email transporter not available');
        return res.status(500).json({ message: 'Unable to send email, but company status updated' });
      }
  
      try {
        await transporter.sendMail({
          from: req.app.get('emailFrom'),
          to: bulkCompany.email,
          subject: 'Your company application has been rejected',
          text: `Dear ${bulkCompany.companyName},
  
  We regret to inform you that your company application has been rejected. ${req.body.details}
  
  Best regards,
  Your Platform Team`
        });
      } catch (emailError) {
        console.error('Error sending rejection email:', emailError);
        return res.status(200).json({ message: 'Company rejected, but email could not be sent', company: bulkCompany });
      }
  
      res.json({ message: 'Company rejected and email sent', company: bulkCompany });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  