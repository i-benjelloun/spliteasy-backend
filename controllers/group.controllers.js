const Group = require('../models/Group.model');
const Joi = require('joi');
const createError = require('http-errors');

// Controller : get all groups where the user is a member
const getGroups = async (req, res, next) => {
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
const createGroup = async (req, res, next) => {
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

module.exports = { getGroups, createGroup };
