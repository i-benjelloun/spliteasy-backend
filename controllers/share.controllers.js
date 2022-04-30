const Joi = require('joi');
const createError = require('http-errors');
const Share = require('../models/Share.model');

// Controller : get shares for a specific expense
exports.getShares = async (req, res, next) => {
  const { expenseId } = req.params;
  try {
    const shares = await Share.find({ expense: expenseId }).populate(
      'user',
      '-password'
    );
    res.json(shares);
  } catch (error) {
    next(createError.NotFound('Route does not exist'));
  }
};

// Controller : create shares
exports.createShares = async (req, res, next) => {
  try {
    const { expenseId } = req.params;

    // Definition of validation schema
    const schema = Joi.object({
      user: Joi.required(),
      share_amount: Joi.number().positive().precision(2).required(),
    });

    // Get validation result
    const validationResult = await schema.validateAsync(req.body);

    // Create shares
    await Share.create({
      ...validationResult,
      expense: expenseId,
    });

    res.json('Shares were created successfully');
  } catch (err) {
    if (err.code === 11000) {
      next(
        createError.Unauthorized(
          'one user can only have one share amount per expense'
        )
      );
    } else {
      next(createError.InternalServerError('Shares could not be created'));
    }
  }
};
