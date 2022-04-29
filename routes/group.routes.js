const { getGroups, createGroup } = require('../controllers/group.controllers');
const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router();

// Route : get all groups where the user is a member
router.get('/', isAuthenticated, getGroups);

// Route : create a group
router.post('/', isAuthenticated, createGroup);

module.exports = router;
