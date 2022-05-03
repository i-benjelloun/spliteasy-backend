const router = require('express').Router();
const authRoutes = require('./auth.routes');
const groupRoutes = require('./group.routes');
const expenseRoutes = require('./expense.routes');

// Auth routes
router.use('/auth', authRoutes);

// Group routes
router.use('/groups', groupRoutes);

// Expense routes
router.use('/groups/:groupId/expenses', expenseRoutes);

module.exports = router;
