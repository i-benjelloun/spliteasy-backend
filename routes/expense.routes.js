const { getExpenses } = require('../controllers/expense.controllers');
const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router({ mergeParams: true });

// Route : get all groups where the user is a member
router.get('/', isAuthenticated, getExpenses);

module.exports = router;
