// import { createTransport } from "nodemailer";

// export const sendEmail = async (to, subject, text) => {
//   // nodemailer setup
//   const transporter = createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.AUTH_EMAIL,
//       pass: process.env.AUTH_PASSWORD,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.AUTH_EMAIL,
//     to,
//     subject,
//     text,
//   });
// };

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Email service configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Set static email from address
const emailFrom = 'noreply@yourcompany.com';

// Function to send email
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: emailFrom,
      to,
      subject,
      html
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  transporter,
  emailFrom,
  sendEmail,
};

