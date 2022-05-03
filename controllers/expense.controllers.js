const Joi = require('joi');
const createError = require('http-errors');
const Expense = require('../models/Expense.model');

// Controller : get expenses for a specific group
exports.getExpenses = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const expenses = await Expense.find({ group: groupId }).populate(
      'paid_by',
      '-password'
    );
    if (!expenses) {
      next(createError.NotFound('Expenses not found'));
    }
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

// Controller : create expense and shares
exports.createExpense = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    // Definition of validation schema
    const schema = Joi.object({
      title: Joi.string().trim().required(),
      paid_by: Joi.required(),
      category: Joi.string().trim().required(),
      expense_amount: Joi.number().positive().precision(2).required(),
      shares: Joi.array().required(),
    });

    // Get validation result
    const validationResult = await schema.validateAsync(req.body);

    // Check if total shares equals the expense amount
    const { shares, expense_amount } = validationResult;
    const totalShares = shares.reduce(
      (a, b) => a.share_amount + b.share_amount
    );
    if (totalShares !== expense_amount) {
      return next(
        createError.Forbidden('Total shares must add up to expense amount')
      );
    }

    // Create expense
    const createdExpense = await Expense.create({
      ...validationResult,
      group: groupId,
    });

    // Return error if expense was not created
    if (!createdExpense) {
      return next(
        createError.BadRequest('An error occured while creating the expense')
      );
    }

    res.json(createdExpense);
  } catch (err) {
    next(err);
  }
};

// Controller : delete expense
exports.deleteExpense = async (req, res, next) => {
  const { expenseId } = req.params;
  try {
    const deletedExpense = await Expense.findOneAndDelete({ _id: expenseId });
    if (!deletedExpense) {
      return next(
        createError.InternalServerError('Expense could not be deleted')
      );
    }
    res.json(deletedExpense);
  } catch (err) {
    next(err);
  }
};

// Controller : get expense by id
exports.getExpenseById = async (req, res, next) => {
  const { expenseId } = req.params;
  try {
    const expense = await Expense.findById(expenseId).populate(
      'paid_by',
      '-password'
    );

    if (!expense) {
      next(createError.NotFound('Expense not found'));
    }

    res.json(expense);
  } catch (err) {
    next(err);
  }
};

// Controller : update expense
exports.updateExpense = async (req, res, next) => {
  const { expenseId } = req.params;

  try {
    // Definition of validation schema
    const schema = Joi.object({
      title: Joi.string().trim().required(),
      paid_by: Joi.required(),
      category: Joi.string().trim().required(),
      expense_amount: Joi.number().positive().precision(2).required(),
      shares: Joi.array().required(),
    });

    // Get validation result
    const validationResult = await schema.validateAsync(req.body);

    // Check if total shares equals the expense amount
    const { shares, expense_amount } = validationResult;
    const totalShares = shares.reduce(
      (a, b) => a.share_amount + b.share_amount
    );
    if (totalShares !== expense_amount) {
      return next(
        createError.Forbidden('Total shares must add up to expense amount')
      );
    }

    // Update expense
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        ...validationResult,
      },
      { new: true }
    );

    if (!updatedExpense) {
      return next(createError.BadRequest('Expense could not be updated'));
    }

    res.json(updatedExpense);
  } catch (err) {
    next(err);
  }
};
