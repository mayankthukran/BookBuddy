const express = require('express');
const auth = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  updatePassword,
  getUserStats
} = require('../controllers/profileController');

const router = express.Router();

// All routes are protected
router.use(auth);

// GET /api/profile - Get user profile
router.get('/', getProfile);

// PUT /api/profile - Update user profile
router.put('/', updateProfile);

// PUT /api/profile/password - Update password
router.put('/password', updatePassword);

// GET /api/profile/stats - Get user statistics
router.get('/stats', getUserStats);

module.exports = router;