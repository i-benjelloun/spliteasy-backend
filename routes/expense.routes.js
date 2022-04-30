const {
  getExpenses,
  createExpense,
  deleteExpense,
} = require('../controllers/expense.controllers');

const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router({ mergeParams: true });

// Route : get all groups where the user is a member
router.get('/', isAuthenticated, getExpenses);

// Route : create expense
router.post('/', isAuthenticated, createExpense);

// Route : delete expense
router.delete('/:expenseId', isAuthenticated, deleteExpense);

module.exports = router;
