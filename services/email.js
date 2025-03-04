// services/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send an email
const sendEmail = async (to, subject, htmlContent) => {
    // Setup Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // You can change this depending on your email provider
        auth: {
            user: process.env.APP_USER,  // Your email id
            pass: process.env.APP_PASS,  // Use App Passwords or OAuth2 for Gmail
        },
    });

    // Prepare the email content
    const mailOptions = {
        from: process.env.APP_EMAIL,
        to,
        subject,
        html: htmlContent,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.log('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports = sendEmail;
