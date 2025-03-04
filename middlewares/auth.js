const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;  // Make sure to store this securely

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            message: 'Access denied, token missing'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;  // Store the decoded user info (userId, email, role)
        next();
    } catch (error) {
        res.status(400).json({
            message: 'Invalid token'
        });
    }
};

module.exports = verifyToken;