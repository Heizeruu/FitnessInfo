const express = require('express');
const router = express.Router();
const {
  registerUser,
  verifyEmail,
  logIn,
  changePassword,
  forgotPassword,
  resetPassword,
  logOut
} = require('../Controller/authController'); // Correct path to authController

// User Registration
router.post('/register', registerUser);

// Email Verification
router.post('/verify-email', verifyEmail);

// User Login
router.post('/login', logIn);

// Change Password
router.put('/change-password/:userID', changePassword);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password', resetPassword);

// User Logout
router.post('/logout', logOut);

module.exports = router;
