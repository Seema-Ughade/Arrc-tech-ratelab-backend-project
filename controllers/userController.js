const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/sendEmail');

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
















  exports.sendMobileVerification = async (req, res) => {
    const { userId } = req.params;
    const { mobile } = req.body;
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      user.mobileVerificationCode = await bcrypt.hash(verificationCode.toString(), 10);
      user.mobileVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      user.mobile = mobile;
      await user.save();
  
      // Here, you would typically send an SMS with the verification code
      // For this example, we'll just log it to the console
      console.log(`Verification code for ${mobile}: ${verificationCode}`);
  
      res.json({ success: true, message: 'Verification code sent successfully' });
    } catch (error) {
      console.error('Error sending verification code:', error);
      res.status(500).json({ message: 'Error sending verification code', error: error.message });
    }
  };
  
  // exports.verifyMobile = async (req, res) => {
  //   const { userId } = req.params;
  //   const { verificationCode } = req.body;
  //   try {
  //     const user = await User.findById(userId);
      
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  
  //     if (user.mobileVerificationExpires < Date.now()) {
  //       return res.status(400).json({ message: 'Verification code has expired' });
  //     }
  
  //     const isValid = await bcrypt.compare(verificationCode, user.mobileVerificationCode);
  
  //     if (!isValid) {
  //       return res.status(400).json({ message: 'Invalid verification code' });
  //     }
  
  //     user.mobileVerified = true;
  //     user.mobileVerificationCode = undefined;
  //     user.mobileVerificationExpires = undefined;
  //     await user.save();
  
  //     res.json({ success: true, message: 'Mobile number verified successfully' });
  //   } catch (error) {
  //     console.error('Error verifying mobile number:', error);
  //     res.status(500).json({ message: 'Error verifying mobile number', error: error.message });
  //   }
  // };
  

  exports.verifyMobile = async (req, res) => {
    const { userId } = req.params;
    const { code } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.mobileVerificationCode || user.mobileVerificationCode !== code) {
            return res.status(400).json({ message: 'Invalid or missing verification code' });
        }

        if (new Date() > new Date(user.mobileVerificationExpires)) {
            return res.status(400).json({ message: 'Verification code has expired' });
        }

        // Mark the mobile number as verified
        user.mobileVerified = true;
        user.mobileVerificationCode = '';
        user.mobileVerificationExpires = null;
        await user.save();

        res.status(200).json({ message: 'Mobile verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
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

















exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.sendEmailVerification = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    await sendEmail(
      user.email,
      'Verify your email',
      `Click <a href="${verificationLink}">here</a> to verify your email.`
    );

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Error in sendEmailVerification:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findByIdAndUpdate(decoded.id, { emailVerified: true }, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Email verified successfully', user });
  } catch (error) {
    console.error('Error in verifyEmail:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};


// exports.verifyMobile = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, { mobileVerified: true }, { new: true });
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };




