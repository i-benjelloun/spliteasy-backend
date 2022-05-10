const router = require('express').Router();
const authRoutes = require('./auth.routes');
const groupRoutes = require('./group.routes');
const expenseRoutes = require('./expense.routes');
const userRoutes = require('./user.routes');

// Auth routes
router.use('/auth', authRoutes);

// Group routes
router.use('/groups', groupRoutes);

// Expense routes
router.use('/groups/:groupId/expenses', expenseRoutes);

// User routes
router.use('/userInfo', userRoutes);

module.exports = router;
