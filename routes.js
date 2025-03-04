const express = require('express');
const router = express.Router();

const signup = require('./controllers/signup');
router.post('/signup',signup);

const login = require('./controllers/login');
router.post('/login',login);

const reset = require('./controllers/reset');
router.post('/password/reset',reset);

module.exports = router;