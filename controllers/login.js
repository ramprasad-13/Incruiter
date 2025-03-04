// routes/login.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sendEmail = require('../services/email');  // Import the emailService


const { validateEmail, validatePassword } = require('../services/validate');

const JWT_SECRET = process.env.JWT_SECRET;  // JWT secret from environment variable

const login = async (req, res) => {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required!"
        });
    }

    if(validateEmail(email) === false) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    if(validatePassword(password) === false) {
        return res.status(400).json({
            message: "Invalid password. Must contains 1 special character, 1 Capital letter, 1 small letter and 1 digit. Lentgh should be between 6 to 20"
        });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        if(!user.isVerified){
            return res.status(400).json({
                message: "User is not verified yet, please check your email for verification. If you didn't receive the email, click the reset button below to resend the verification email."
            });
        }

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Check if user is verified
        if (!user.isVerified) {
            // If user is not verified, send them a verification email
            const token = jwt.sign(
                { userId: user._id },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            const verificationLink = `${req.protocol}://${req.get('host')}/verify/${token}`;
            
            const htmlContent = `
                <p>Hi ${user.fullName},</p>
                <p>It looks like you're trying to log in, but your email isn't verified yet.</p>
                <p>Please verify your email by clicking the link below:</p>
                <a href="${verificationLink}">Verify Email</a>
            `;

            await sendEmail(email, 'Email Verification', htmlContent);

            return res.status(400).json({
                message: "User is not verified yet, please check your email for verification"
            });
        }

        // If user is verified, generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '4h' }  // Token expires in 4 hours (adjust as needed)
        );

        res.status(200).json({
            token  // Send the JWT token to the client
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Login failed, please try again later"
        });
    }
};

module.exports = login;
