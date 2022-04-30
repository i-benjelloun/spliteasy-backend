const Joi = require('joi');
const createError = require('http-errors');
const Share = require('../models/Share.model');

// Controller : get expenses for a specific group
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
