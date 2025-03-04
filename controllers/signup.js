// routes/signup.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/email');  // Import sendEmail function

const { validateEmail, validateMobileNumber, validateFullName, validateRole, validatePassword } = require('../services/validate');

const signup = async (req, res) => {
    const { email, password, mobileNumber, fullName, role = 'user' } = req.body;

    // Check if all fields are provided
    if (!email || !password || !mobileNumber || !fullName || !role) {
        return res.status(400).json({
            message: "All the fields are required!"
        });
    }

    if(validateEmail(email) === false) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    if(validateRole(role) === false) {
        return res.status(400).json({
            message: "Invalid role"
        });
    }

    if(validateMobileNumber(mobileNumber) === false) {
        return res.status(400).json({
            message: "Invalid mobile number"
        });
    }

    if(validateFullName(fullName) === false) {
        return res.status(400).json({
            message: "Invalid full name"
        });
    }

    if(validatePassword(password) === false) {
        return res.status(400).json({
            message: "Invalid password. Must contains 1 special character, 1 Capital letter, 1 small letter and 1 digit. Lentgh should be between 6 to 20"
        });
    }

    // Check if the user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with an 'isVerified' flag set to false
        const user = new User({
            email,
            password: hashedPassword,
            mobileNumber,
            fullName,
            role,
            isVerified: false, // User is not verified initially
        });

        // Save the user in the database in a 'pending' state (unverified)
        await user.save();

        // Generate a JWT token for email verification
        const token = jwt.sign(
            { userId: user._id },process.env.JWT_SECRET,  // Use a secret key to sign the token
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Create a verification link
        const verificationLink = `${req.protocol}://${req.get('host')}/verify/${token}`;

        // Prepare the email content
        const htmlContent = `
            <p>Hi ${fullName},</p>
            <p>Thank you for registering. Please verify your email by clicking the link below:</p>
            <a href="${verificationLink}">Verify Email</a>
        `;

        // Send the verification email
        await sendEmail(email, 'Email Verification', htmlContent);

        // Respond to the user
        res.status(201).json({
            message: `Hi ${user.fullName}, your account was created successfully! Please check your email to verify your account.`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Registration was unsuccessful"
        });
    }
};

module.exports = signup;
