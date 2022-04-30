const router = require('express').Router();
const authRoutes = require('./auth.routes');
const groupRoutes = require('./group.routes');
const expenseRoutes = require('./expense.routes');
const shareRoutes = require('./share.routes');

// Auth routes
router.use('/auth', authRoutes);

// Group routes
router.use('/groups', groupRoutes);

// Expense routes
router.use('/groups/:groupId/expenses', expenseRoutes);

// Share routes
router.use('/groups/:groupId/expenses/:expenseId/shares', shareRoutes);

module.exports = router;
