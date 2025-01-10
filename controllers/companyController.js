// const Company = require('../models/Company');
// const cloudinary = require('../config/cloudinaryConfig');
// const getDataUri = require('../utils/dataUri');

// exports.createCompany = async (req, res) => {
//   try {
//     const { companyName, category, url, email, address, tags, description } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: 'Image is required' });
//     }

//     // Convert file to data URI and upload to Cloudinary
//     const fileUri = getDataUri(req.file);
//     const result = await cloudinary.uploader.upload(fileUri.content);

//     const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

//     const newCompany = new Company({
//       companyName,
//       category,
//       url,
//       email,
//       address,
//       tags: tagsArray,
//       description,
//       imageUrl: result.secure_url,
//     });

//     await newCompany.save();
//     res.status(201).json({ message: 'Company created successfully', company: newCompany });
//   } catch (error) {
//     console.error('Error creating company:', error);
//     res.status(500).json({ message: 'Error creating company', error: error.message });
//   }
// };

// exports.getCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find().sort({ createdAt: -1 });
//     res.status(200).json(companies);
//   } catch (error) {
//     console.error('Error fetching companies:', error);
//     res.status(500).json({ message: 'Error fetching companies', error: error.message });
//   }
// };

// exports.getCompanyById = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.id);
//     if (!company) {
//       return res.status(404).json({ message: 'Company not found' });
//     }
//     res.status(200).json(company);
//   } catch (error) {
//     console.error('Error fetching company:', error);
//     res.status(500).json({ message: 'Error fetching company', error: error.message });
//   }
// };

// exports.updateCompany = async (req, res) => {
//   try {
//     const { companyName, category, url, email, address, tags, description } = req.body;

//     const updateData = {
//       companyName,
//       category,
//       url,
//       email,
//       address,
//       tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
//       description,
//     };

//     if (req.file) {
//       const fileUri = getDataUri(req.file);
//       const result = await cloudinary.uploader.upload(fileUri.content);
//       updateData.imageUrl = result.secure_url;
//     }

//     const updatedCompany = await Company.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!updatedCompany) {
//       return res.status(404).json({ message: 'Company not found' });
//     }

//     res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
//   } catch (error) {
//     console.error('Error updating company:', error);
//     res.status(500).json({ message: 'Error updating company', error: error.message });
//   }
// };

// exports.deleteCompany = async (req, res) => {
//   try {
//     const deletedCompany = await Company.findByIdAndDelete(req.params.id);
//     if (!deletedCompany) {
//       return res.status(404).json({ message: 'Company not found' });
//     }
//     res.status(200).json({ message: 'Company deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting company:', error);
//     res.status(500).json({ message: 'Error deleting company', error: error.message });
//   }
// };

const Company = require('../models/Company');
const cloudinary = require('../config/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const { companyName, category, url, email, address, tags, description, userId, userName } = req.body;

    if (!userId || !userName) {
      return res.status(400).json({ message: 'User information is required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const fileUri = getDataUri(req.file);
    const result = await cloudinary.uploader.upload(fileUri.content);

    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const newCompany = new Company({
      companyName,
      category,
      url,
      email,
      address,
      tags: tagsArray,
      description,
      imageUrl: result.secure_url,
      userId,
      userName
    });

    await newCompany.save();
    res.status(201).json({ message: 'Company created successfully', company: newCompany });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ message: 'Error creating company', error: error.message });
  }
};

// Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Error fetching companies', error: error.message });
  }
};

// Get a single company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Error fetching company', error: error.message });
  }
};

// Update a company
exports.updateCompany = async (req, res) => {
  try {
    const { companyName, category, url, email, address, tags, description } = req.body;
    const companyId = req.params.id;

    let updateData = {
      companyName,
      category,
      url,
      email,
      address,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      description
    };

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const result = await cloudinary.uploader.upload(fileUri.content);
      updateData.imageUrl = result.secure_url;
    }

    const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ message: 'Error updating company', error: error.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: 'Error deleting company', error: error.message });
  }
};

// Delete all companies
exports.deleteAllCompanies = async (req, res) => {
  try {
    await Company.deleteMany({});
    res.status(200).json({ message: 'All companies deleted successfully' });
  } catch (error) {
    console.error('Error deleting all companies:', error);
    res.status(500).json({ message: 'Error deleting all companies', error: error.message });
  }
};

// Get companies by user ID
exports.getCompaniesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const companies = await Company.find({ userId: userId });
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies by user ID:', error);
    res.status(500).json({ message: 'Error fetching companies by user ID', error: error.message });
  }
};

