const { isValidId } = require('../helpers/isValidId');
const Group = require('../models/Group.model');

exports.isGroupOwner = async (req, res, next) => {
  const current_user = req.payload._id;
  const { groupId } = req.params;
  if (!isValidId(groupId)) {
    return res.status(404).json({ errorMessage: 'Resource not found' });
  } else {
    const group = await Group.findById(groupId);
    if (current_user === group.owner.toString()) {
      next();
    } else {
      return res
        .status(403)
        .json({ errorMessage: 'Only group owners can update a group' });
    }
  }
};
