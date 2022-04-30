const { getShares } = require('../controllers/share.controllers');

const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router({ mergeParams: true });

// Route : get all shares for an expense
router.get('/', isAuthenticated, getShares);

module.exports = router;
