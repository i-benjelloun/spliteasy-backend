const Joi = require('joi');
const createError = require('http-errors');
const Expense = require('../models/Expense.model');

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

// Controller : create expense
exports.createExpense = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    // Definition of validation schema
    const schema = Joi.object({
      title: Joi.string().trim().required(),
      paidBy: Joi.required(),
      category: Joi.string().trim().required(),
      expense_amount: Joi.number().positive().precision(2).required(),
    });

    // Get validation result
    const validationResult = await schema.validateAsync(req.body);

    // Create group
    const expense = await Expense.create({
      ...validationResult,
      group: groupId,
    });

    res.json(expense);
  } catch (err) {
    console.log(err);
    next(createError.InternalServerError('Expense was not created'));
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
