const express = require('express');

const { isAuthenticated } = require('./../middlewares/jwt.middlewares.js');
const {
  signupController,
  verifyController,
  loginController,
} = require('../controllers/auth.controllers');

const router = express.Router();

// Signup route
router.post('/signup', signupController);

// Login route
router.post('/login', loginController);

// Verify route
router.get('/verify', isAuthenticated, verifyController);

module.exports = router;
