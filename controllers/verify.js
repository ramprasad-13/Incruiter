const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        // Set the user as verified
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email successfully verified!' });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyEmail;
