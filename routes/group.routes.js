const {
  getGroups,
  createGroup,
  deleteGroup,
  getGroupById,
  updateGroup,
  getBalances,
  joinGroup,
  archiveGroup,
  restoreGroup,
} = require('../controllers/group.controllers');
const { idValidation } = require('../middlewares/idValidation.middlewares');
const { isGroupMember } = require('../middlewares/isGroupMember.middlewares');
const { isGroupOwner } = require('../middlewares/isGroupOwner.middlewares');
const { isAuthenticated } = require('../middlewares/jwt.middlewares');
const router = require('express').Router();

// Route : get all groups where the user is a member
router.get('/', isAuthenticated, getGroups);

// Route : create group
router.post('/', isAuthenticated, createGroup);

// Route : delete group
router.delete(
  '/:groupId',
  idValidation,
  isAuthenticated,
  isGroupMember,
  deleteGroup
);

// Route : delete group
router.get(
  '/:groupId',
  idValidation,
  isAuthenticated,
  isGroupMember,
  getGroupById
);

// Route : update group
router.patch(
  '/:groupId',
  idValidation,
  isAuthenticated,
  isGroupOwner,
  updateGroup
);

// Route : update group
router.get(
  '/:groupId/balances',
  idValidation,
  isAuthenticated,
  isGroupMember,
  getBalances
);

// Route : archive group
router.post(
  '/:groupId/archive',
  idValidation,
  isAuthenticated,
  isGroupMember,
  archiveGroup
);

// Route : archive group
router.delete(
  '/:groupId/restore',
  idValidation,
  isAuthenticated,
  isGroupMember,
  restoreGroup
);

router.patch('/:encryptedId/join', isAuthenticated, joinGroup);

module.exports = router;
