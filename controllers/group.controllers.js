const Group = require('../models/Group.model');
const Joi = require('joi');
const createError = require('http-errors');

// Controller : get all groups where the user is a member
exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find({ members: req.payload._id }).populate(
      'members',
      '-password'
    );
    res.json(groups);
  } catch (error) {
    next(error);
  }
};

// Controller : create new group
exports.createGroup = async (req, res, next) => {
  try {
    // Definition of validation schema
    const schema = Joi.object({
      title: Joi.string().trim().required(),
      category: Joi.string().trim().required(),
      currency: Joi.string().trim().required(),
      isArchived: Joi.bool(),
      members: Joi.array().required(),
    });

    // Get validation result
    const validationResult = await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    // Create group
    const group = await Group.create({
      ...validationResult,
      owner: req.payload._id,
    });

    res.json(group);
  } catch (err) {
    console.log(err);
    next(createError.InternalServerError('Group was not created'));
  }
};

// Controller : delete group
exports.deleteGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    await Group.findOneAndDelete({ _id: groupId });
    res.json('Group deleted successfully');
  } catch (err) {
    next(createError.InternalServerError('Group could not be deleted'));
  }
};

// Controller : get group by id
exports.getGroupById = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId)
      .populate('members', '-password')
      .populate('owner', '-password');

    res.json(group);
  } catch (error) {
    next(error);
  }
};

// Controller : update group
exports.updateGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    // Definition of validation schema
    const schema = Joi.object({
      title: Joi.string().trim().required(),
      category: Joi.string().trim().required(),
      isArchived: Joi.bool(),
      members: Joi.array().required(),
    });

    // Get validation result
    const validationResult = await schema.validateAsync(req.body);

    // Update group
    await Group.findByIdAndUpdate(groupId, {
      ...validationResult,
    });
    res.json(`Group updated successfully`);
  } catch (error) {
    next(createError.InternalServerError('Group could not be updated'));
  }
};
