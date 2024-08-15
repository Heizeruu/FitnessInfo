const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

// Generates a random reset token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Sends a password reset email
const sendResetPasswordEmail = async (email, resetToken) => {
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
      subject: 'Password Reset',
      html: `<p>To reset your password, click the link below:</p>
             <p><a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Reset Password</a></p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    throw new Error('Failed to send password reset email.');
  }
};

module.exports = { generateResetToken, sendResetPasswordEmail };
