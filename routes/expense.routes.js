const {
  getExpenses,
  createExpense,
  deleteExpense,
  getExpenseById,
  updateExpense,
} = require('../controllers/expense.controllers');

const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router({ mergeParams: true });

// Route : get all expenses for a group
router.get('/', isAuthenticated, getExpenses);

// Route : create expense
router.post('/', isAuthenticated, createExpense);

// Route : delete expense
router.delete('/:expenseId', isAuthenticated, deleteExpense);

// Route : get expense by id
router.get('/:expenseId', isAuthenticated, getExpenseById);

// Route : update expense
router.patch('/:expenseId', isAuthenticated, updateExpense);

module.exports = router;
