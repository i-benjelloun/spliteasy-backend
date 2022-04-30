const { getShares, createShares } = require('../controllers/share.controllers');

const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router({ mergeParams: true });

// Route : get shares for a specific expense
router.get('/', isAuthenticated, getShares);

// Route : create shares
router.post('/', isAuthenticated, createShares);

module.exports = router;
