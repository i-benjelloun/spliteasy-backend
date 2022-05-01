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

    // Return an error if resources are not found
    if (shares.length < 1) {
      return next(createError.NotFound('Not found'));
    }

    res.json(shares);
  } catch (err) {
    next(err);
  }
};
