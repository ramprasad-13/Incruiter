const User = require('../models/User');

const protectedRoute = async (req, res) => {
    const user = await User.findById(req.user.userId);
    try {
        res.json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = protectedRoute;