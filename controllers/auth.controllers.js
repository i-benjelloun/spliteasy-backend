const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 12;
const createError = require('http-errors');

// Signup Controller
const signupController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if email or password or name are provided as empty string
    if (firstName === '' || lastName === '' || email === '' || password === '')
      return next(
        createError.BadRequest(
          'Provide first name, last name, password and name'
        )
      );

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return next(createError.BadRequest('Provide a valid email address.'));
    }

    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return next(
        createError.BadRequest(
          'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.'
        )
      );
    }

    // Check the users collection if a user with the same email already exists
    const user = await User.findOne({ email });
    if (user) {
      return next(createError.BadRequest('User already exists.'));
    } else {
      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      const createdUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
      });
    }
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError('Internal Server Error'));
  }
};

// Log In Controller
const loginController = async (req, res, next) => {
  try {
    // Get email and password from the body of the request
    const { email, password } = req.body;

    // Check if email or password are provided as empty string
    if (email === '' || password === '') {
      return next(createError.BadRequest('Provide email and password.'));
    }

    // Check the users collection if a user with the same email exists
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      // If the user is not found, send an error response
      return next(createError.Unauthorized('User not found.'));
    } else {
      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Create an object that will be set as the token payload
        const payload = { _id: foundUser._id, email: foundUser.email };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h',
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        return next(
          createError.Unauthorized('Unable to authenticate the user')
        );
      }
    }
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError('Internal Server Error'));
  }
};

// Verify Controller
const verifyController = (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data previously set as the token payload
  res.status(200).json(req.payload);
};

module.exports = { loginController, signupController, verifyController };
