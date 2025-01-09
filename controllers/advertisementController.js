const Advertisement = require('../models/Advertisement');
const cloudinary = require('../config/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

exports.getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching advertisements', error: error.message });
  }
};

exports.createAdvertisement = async (req, res) => {
  try {
    const { type, size, redirectUrl } = req.body;
    let imageUrl;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const result = await cloudinary.uploader.upload(fileUri.content);
      imageUrl = result.secure_url;
    }

    const newAdvertisement = new Advertisement({
      type,
      size,
      redirectUrl,
      imageUrl
    });

    await newAdvertisement.save();
    res.status(201).json(newAdvertisement);
  } catch (error) {
    res.status(400).json({ message: 'Error creating advertisement', error: error.message });
  }
};

exports.updateAdvertisement = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, size, redirectUrl, status } = req.body;
    let imageUrl;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const result = await cloudinary.uploader.upload(fileUri.content);
      imageUrl = result.secure_url;
    }

    const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
      id,
      { type, size, redirectUrl, status, ...(imageUrl && { imageUrl }) },
      { new: true }
    );

    if (!updatedAdvertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json(updatedAdvertisement);
  } catch (error) {
    res.status(400).json({ message: 'Error updating advertisement', error: error.message });
  }
};

exports.deleteAdvertisement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdvertisement = await Advertisement.findByIdAndDelete(id);

    if (!deletedAdvertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json({ message: 'Advertisement deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting advertisement', error: error.message });
  }
};

exports.updateAdvertisementStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAdvertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json(updatedAdvertisement);
  } catch (error) {
    res.status(400).json({ message: 'Error updating advertisement status', error: error.message });
  }
};