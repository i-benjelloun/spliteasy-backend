const { isValidId } = require('../helpers/isValidId');
const Group = require('../models/Group.model');

exports.isGroupMember = async (req, res, next) => {
  const current_user = req.payload._id;
  const { groupId } = req.params;
  if (!isValidId(groupId)) {
    return res.status(404).json({ errorMessage: 'Resource does not exist' });
  } else {
    const group = await Group.findById(groupId);
    if (group.members.includes(current_user)) {
      next();
    } else {
      return res
        .status(403)
        .json({ errorMessage: 'Unauthorized access to resource' });
    }
  }
};
