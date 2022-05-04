const {
  getGroups,
  createGroup,
  deleteGroup,
  getGroupById,
  updateGroup,
  getBalances,
} = require('../controllers/group.controllers');
const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router();

// Route : get all groups where the user is a member
router.get('/', isAuthenticated, getGroups);

// Route : create group
router.post('/', isAuthenticated, createGroup);

// Route : delete group
router.delete('/:groupId', isAuthenticated, deleteGroup);

// Route : delete group
router.get('/:groupId', isAuthenticated, getGroupById);

// Route : update group
router.patch('/:groupId', isAuthenticated, updateGroup);

// Route : update group
router.get('/:groupId/balances', isAuthenticated, getBalances);

module.exports = router;
