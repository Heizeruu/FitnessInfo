// backend/Controller/authController.js

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv').config();
const logger = require('../logger/logger'); // Ensure this path is correct
const { generateTokens } = require('../middleware/verifyToken'); // Ensure this path is correct
const { generateResetToken, sendResetPasswordEmail } = require('../utils/passwordReset');
const User = require('../models/user');
const bcrypt = require('bcrypt');



// Hash the password
const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error('Error hashing password:', error);
    throw new Error('Failed to hash password.');
  }
};

// Validate email
const validateEmail = (email) => {
  const emailRegex = /^[\w.-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, errorMessage: 'Invalid email format. Please use your valid gmail account' };
  }
  return { isValid: true };
};

// Validate password format
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return { isValid: false, errorMessage: 'Password should have capital letters, numbers, and symbols' };
  }
  return { isValid: true };
};

// Sends a verification email with a verification code.
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: 'Email Verification',
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error('Error sending verification email:', error.message);
    throw new Error('Failed to send verification email.');
  }
};

// Generates a random verification code.
const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString('hex');
};

const registerUser = async (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  try {
    logger.info('Registration attempt received', { username, email });

    if (!username || !email || !password || !passwordConfirmation) {
      logger.warn('Registration failed: Missing fields', { username, email });
      return res.status(400).json({ error: 'Please fill in all the required fields' });
    }

    if (username.length < 5 || username.length > 12) {
      logger.warn('Registration failed: Invalid username length', { username });
      return res.status(400).json({ error: 'Username should be longer than 5 characters and maximum of 12 characters' });
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      logger.warn('Registration failed: Username already taken', { username });
      return res.status(400).json({ error: 'Username already taken' });
    }

    const validatedEmail = validateEmail(email);
    if (!validatedEmail.isValid) {
      logger.warn('Registration failed: Invalid email format', { email });
      return res.status(400).json({ error: 'Please input a valid email' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('Registration failed: Email already registered', { email });
      return res.status(400).json({ error: 'Email is already registered' });
    }

    if (password.length <= 6 || password.length >= 16) {
      logger.warn('Registration failed: Invalid password length', { username });
      return res.status(400).json({ error: 'Passwords should be longer than 6 characters and maximum of 16 characters' });
    }

    if (password !== passwordConfirmation) {
      logger.warn('Registration failed: Passwords do not match', { username });
      return res.status(400).json({ error: 'Passwords should match' });
    }

    const hashedPassword = await hashPassword(password);
    logger.info('Password hashed successfully', { username });

    const verificationCode = generateVerificationCode();
    logger.info('Verification code generated', { username, verificationCode });

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode,
      joinedDate: new Date()
    });

    await newUser.save();
    logger.info('New user saved to the database', { username, email });

    await sendVerificationEmail(email, verificationCode);
    logger.info('Verification email sent to', { email });

    res.status(201).json({ msg: 'Verification code sent. Please check your email' });

  } catch (err) {
    logger.error('Error registering user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;
  try {
    logger.info('Email verification attempt received', { email });

    if (!email || !verificationCode) {
      logger.warn('Verification failed: Missing fields', { email, verificationCode });
      return res.status(400).json({ error: 'Please fill in all the required fields' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      logger.warn('Verification failed: User not found', { email });
      return res.status(400).json({ error: 'User is not found' });
    }

    if (user.verificationCode !== verificationCode) {
      logger.warn('Verification failed: Incorrect verification code', { email });
      return res.status(400).json({ error: 'Incorrect verification code' });
    }

    user.verified = true;
    user.verificationCode = null;
    await user.save();
    logger.info('User verified and updated successfully', { email });

    res.status(200).json({ msg: 'Email verified successfully. User registered.' });

  } catch (err) {
    logger.error('Error verifying email:', err);
    res.status(500).json({ error: 'Error verifying email. Please try again later.' });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    logger.info('User login attempt received', { email });

    if (!email || !password) {
      logger.warn('Login failed: Missing fields', { email });
      return res.status(400).json({ error: 'Please fill in the required fields' });
    }

    const validatedEmail = validateEmail(email);
    if (!validatedEmail.isValid) {
      logger.warn('Login failed: Invalid email format', { email });
      return res.status(400).json({ error: 'Please input a valid email' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      logger.warn('Login failed: User not found', { email });
      return res.status(404).json({ error: 'User is not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn('Login failed: Incorrect password', { email });
      return res.status(400).json({ error: 'Incorrect password. Please try again.' });
    }

    if (user.verificationCode !== null) {
      logger.warn('Login failed: Email not verified', { email });
      return res.status(400).json({ error: 'Please verify your email first' });
    }

    const tokens = generateTokens(user);
    const accessToken = tokens.accessToken;
    const refreshToken = tokens.refreshToken;

    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.cookie('accessToken', accessToken, { 
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    logger.info('User logged in successfully', { email });

    res.status(200).json({
      username: user.username,
      msg: 'User logged in successfully',
      userID: user._id,
      userRole: user.role,
      accessToken,
      refreshToken
    });
  } catch (err) {
    logger.error('Error logging in user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, newPasswordConfirmation } = req.body;
    const { userID } = req.params;

    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      return res.status(404).json({ error: "Please fill in all the required fields" });
    }

    if (!userID) {
      return res.status(404).json({ error: 'User ID is not found' });
    }

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    if (newPassword.length <= 6 || newPassword.length >= 16) {
      return res.status(400).json({ error: 'New password should be between 6 and 16 characters' });
    }

    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({ error: 'New passwords do not match' });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: 'Password changed successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: 'Please provide your email' });
    }

    const validatedEmail = validateEmail(email);
    if (!validatedEmail.isValid) {
      return res.status(400).json({ error: 'Please input a valid email' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with this email' });
    }

    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    await user.save();

    await sendResetPasswordEmail(email, resetToken);
    res.status(200).json({ msg: 'Password reset email sent' });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword, newPasswordConfirmation } = req.body;

  try {
    if (!resetToken || !newPassword || !newPasswordConfirmation) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const user = await User.findOne({ resetToken });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    if (newPassword.length <= 6 || newPassword.length >= 16) {
      return res.status(400).json({ error: 'Password should be between 6 and 16 characters' });
    }

    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.status(200).json({ msg: 'Password reset successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const logOut = async (req, res) => {
  try {
    res.cookie('refreshToken', '', { httpOnly: true, expires: new Date(0) });
    res.cookie('accessToken', '', { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ msg: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Export all functions
module.exports = {
  registerUser,
  verifyEmail,
  logIn,
  changePassword,
  forgotPassword,
  resetPassword,
  logOut
};
