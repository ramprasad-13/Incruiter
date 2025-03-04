const express = require('express');
const router = express.Router();

const protectedRoute = require('./controllers/protectedRoute');
router.get('/user',protectedRoute);

module.exports = router;