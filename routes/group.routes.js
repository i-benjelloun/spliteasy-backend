const {
  getGroups,
  createGroup,
  deleteGroup,
  getGroupById,
  updateGroup,
  getBalances,
  joinGroup,
} = require('../controllers/group.controllers');
const { isGroupMember } = require('../middlewares/isGroupMember.middlewares');
const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router();

// Route : get all groups where the user is a member
router.get('/', isAuthenticated, getGroups);

// Route : create group
router.post('/', isAuthenticated, isGroupMember, createGroup);

// Route : delete group
router.delete('/:groupId', isAuthenticated, isGroupMember, deleteGroup);

// Route : delete group
router.get('/:groupId', isAuthenticated, isGroupMember, getGroupById);

// Route : update group
router.patch('/:groupId', isAuthenticated, isGroupMember, updateGroup);

// Route : update group
router.get('/:groupId/balances', isAuthenticated, isGroupMember, getBalances);

router.patch('/:encryptedId/join', isAuthenticated, joinGroup);

module.exports = router;
