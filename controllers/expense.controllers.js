const Joi = require('joi');
const createError = require('http-errors');
const Expense = require('../models/Expense.model');
const Share = require('../models/Share.model');

// Controller : get expenses for a specific group
exports.getExpenses = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const expenses = await Expense.find({ group: groupId }).populate(
      'paidBy',
      '-password'
    );
    console.log(expenses);
    res.json(expenses);
  } catch (error) {
    next(createError.NotFound('Route not found'));
  }
};

// Controller : create expense and shares
exports.createExpense = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    // Definition of validation schema
    const schema = Joi.object({
      title: Joi.string().trim().required(),
      paidBy: Joi.required(),
      category: Joi.string().trim().required(),
      expense_amount: Joi.number().positive().precision(2).required(),
      shares: Joi.required(),
    });

    // Get validation result
    const validationResult = await schema.validateAsync(req.body);

    // Separate expense properties and shares
    const { shares, ...expense } = validationResult;

    // Check if total shares equals the expense amount
    const totalShares = shares.reduce(
      (a, b) => a.share_amount + b.share_amount
    );
    if (totalShares !== expense.expense_amount) {
      return next(
        createError.Forbidden('Total shares must add up to expense amount')
      );
    }

    // Create expense
    const createdExpense = await Expense.create({
      ...expense,
      group: groupId,
    });

    // Return error if expense was not created
    if (!createdExpense) {
      return next(
        createError.BadRequest('An error occured while creating the expense')
      );
    }

    // Append expense id to shares and filter out shares with null amount
    const filteredShares = shares
      .map((share) => {
        return { ...share, expense: createdExpense._id };
      })
      .filter((share) => {
        return share.share_amount > 0;
      });

    // Create shares
    const createdShares = await Share.create(filteredShares);

    // Return error if shares were not created
    if (!createdShares) {
      return next(
        createError.BadRequest('An error occured while creating the shares')
      );
    }

    res.json({ createdExpense, createdShares });
  } catch (err) {
    next(err);
  }
};

// Controller : delete expense
exports.deleteExpense = async (req, res, next) => {
  const { expenseId } = req.params;
  try {
    await Expense.findOneAndDelete({ _id: expenseId });
    res.json('Expense deleted successfully');
  } catch (err) {
    next(createError.InternalServerError('Expense could not be deleted'));
  }
};

// Controller : get expense by id
exports.getExpenseById = async (req, res, next) => {
  const { expenseId } = req.params;
  try {
    const expense = await Expense.findById(expenseId).populate(
      'paidBy',
      '-password'
    );

    res.json(expense);
  } catch (err) {
    next(createError.NotFound('Expense could not be retrieved'));
  }
};

// Controller : update expense
exports.updateExpense = async (req, res, next) => {
  const { expenseId } = req.params;

  try {
    // Definition of validation schema
    const schema = Joi.object({
      title: Joi.string().trim().required(),
      paidBy: Joi.required(),
      category: Joi.string().trim().required(),
      expense_amount: Joi.number().positive().precision(2).required(),
    });

    // Get validation result
    const validationResult = await schema.validateAsync(req.body);

    // Update expense
    await Expense.findByIdAndUpdate(expenseId, {
      ...validationResult,
    });

    res.json('Expense updated successfully');
    d;
  } catch (err) {
    next(createError.InternalServerError('Expense could not be updated'));
  }
};
