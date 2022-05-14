const Group = require('../models/Group.model');

exports.isGroupMember = async (req, res, next) => {
  const current_user = req.payload._id;
  const { groupId } = req.params;
  const group = await Group.findById(groupId);
  if (group.members.includes(current_user)) {
    next();
  } else {
    return res
      .status(403)
      .json({ errorMessage: 'Unauthorized access to resource' });
  }
};
