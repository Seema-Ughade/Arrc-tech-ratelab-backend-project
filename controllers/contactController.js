const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    const newContact = new Contact({
      fullName,
      email,
      subject,
      message
    });

    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'An error occurred while submitting the form' });
  }
};

