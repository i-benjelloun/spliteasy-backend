const {
  getExpenses,
  createExpense,
  deleteExpense,
  getExpenseById,
  updateExpense,
} = require('../controllers/expense.controllers');
const { isGroupMember } = require('../middlewares/isGroupMember.middlewares');

const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router({ mergeParams: true });

// Route : get all expenses for a group
router.get('/', isAuthenticated, isGroupMember, getExpenses);

// Route : create expense
router.post('/', isAuthenticated, isGroupMember, createExpense);

// Route : delete expense
router.delete('/:expenseId', isAuthenticated, isGroupMember, deleteExpense);

// Route : get expense by id
router.get('/:expenseId', isAuthenticated, isGroupMember, getExpenseById);

// Route : update expense
router.patch('/:expenseId', isAuthenticated, isGroupMember, updateExpense);

module.exports = router;
