const express = require('express');

const { isAuthenticated } = require('./../middlewares/jwt.middlewares.js');
const {
  signupController,
  verifyController,
  signinController,
} = require('../controllers/auth.controllers');

const router = express.Router();

// Signup route
router.post('/signup', signupController);

// Signin route
router.post('/signin', signinController);

// verigy route
router.get('/verify', isAuthenticated, verifyController);

module.exports = router;
