// routes/reset.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/email');  // Import sendEmail function

const { validateEmail, validatePassword } = require('../services/validate');

const reset = async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and Password fields is required!"
        });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({
            message: "Invalid email address"
        });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    // Check if the user already exists
    const findUser = await User.findOne({ email });
    if (!findUser) {
        return res.status(400).json({
            message: "User not exists"
        });
    }

    try {

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user password

        findUser.password = hashedPassword;
        findUser.isVerified = false;
        await findUser.save();
        // Generate a JWT token for email verification
        const token = jwt.sign(
            { userId: findUser._id },process.env.JWT_SECRET,  // Use a secret key to sign the token
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Create a verification link
        const domain = process.env.DOMAIN;
        const verificationLink = `${domain}/verify/${token}`;

        // Prepare the email content
        const htmlContent = `
            <p>Hi ${findUser.fullName},</p>
            <p>Your Password Reset is Sucessfull. Please verify your email by clicking the link below:</p>
            <a href="${verificationLink}">Verify Email</a>
        `;

        // Send the verification email
        await sendEmail(email, 'Email Verification', htmlContent);

        // Respond to the user
        res.status(201).json({
            domain:`${process.env.DOMAIN}`,
            success:'ok'
            message: `Hi ${findUser.fullName}, your account password was updated successfully! Please check your email to verify your account.`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Password Reset was unsuccessful"
        });
    }
};

module.exports = reset;
