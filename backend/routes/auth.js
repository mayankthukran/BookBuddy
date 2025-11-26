const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/signup - Register new user
router.post('/signup', signup);

// POST /api/auth/login - Authenticate user
router.post('/login', login);

module.exports = router;