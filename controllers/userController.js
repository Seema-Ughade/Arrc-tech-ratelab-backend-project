const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, agreeToTerms , role = 'user'} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      agreeToTerms,
            role,

    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  };














































































// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();  // Retrieve all users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;  // Extract user ID from URL parameters
    const user = await User.findById(id);  // Find user by ID
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;  // Extract user ID from URL parameters
    const { firstName, lastName, email, password, role } = req.body;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If password is provided, hash it
    let updatedFields = { firstName, lastName, email, role };
    if (password) {
      updatedFields.password = await bcrypt.hash(password, 12);  // Hash password if provided
    }

    // Update the user document with new fields
    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;  // Extract user ID from URL parameters
    const user = await User.findById(id);  // Find user by ID
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};
