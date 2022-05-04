const Joi = require('joi');
const createError = require('http-errors');
const Expense = require('../models/Expense.model');
const Group = require('../models/Group.model');
const { computeBalances } = require('../helpers/computeBalances');
const { computeReimbursements } = require('../helpers/computeReimbursements');

// Controller : get all groups where the user is a member
exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find({ members: req.payload._id }).populate(
      'members',
      '-password'
    );

    if (!groups) {
      next(createError.NotFound('ERROR : Groups not found'));
    }

    res.json(groups);
  } catch (err) {
    next(createError.InternalServerError(err.name + ' : ' + err.message));
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
    const validationResult = await schema.validateAsync(req.body);

    // Create group
    const createdGroup = await Group.create({
      ...validationResult,
      members: [req.payload._id, ...validationResult.members],
      owner: req.payload._id,
    });

    if (!createdGroup) {
      return next(createError.BadRequest('ERROR : Group was not created'));
    }

    res.json(createdGroup);
  } catch (err) {
    next(createError.InternalServerError(err.name + ' : ' + err.message));
  }
};

// Controller : delete group
exports.deleteGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const deletedGroup = await Group.findOneAndDelete({ _id: groupId });
    if (!deletedGroup) {
      return next(createError.BadRequest('ERROR : Group was not deleted'));
    }
    res.json(deletedGroup);
  } catch (err) {
    next(createError.InternalServerError(err.name + ' : ' + err.message));
  }
};

// Controller : get group by id
exports.getGroupById = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId)
      .populate('members', '-password')
      .populate('owner', '-password');

    if (!group) {
      return next(createError.NotFound('ERROR : Group not found'));
    }

    res.json(group);
  } catch (err) {
    next(createError.InternalServerError(err.name + ' : ' + err.message));
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

    // Can't remove a member who was involved in at least one expense
    const groupExpenses = await Expense.find({ group: groupId });
    const currentGroup = await Group.findById(groupId);

    for (let member of currentGroup.members) {
      // Perform verifications on deleted members only
      if (!validationResult.members.includes(member.toString())) {
        // Expenses where deleted member was involved
        const memberExpenses = groupExpenses.filter((exp) => {
          return (
            exp.paid_by.equals(member) ||
            exp.shares.filter((share) => {
              return share.shared_with.equals(member);
            }).length !== 0
          );
        });

        // If member was involved in an expense return an error
        if (memberExpenses.length > 0) {
          return next(
            createError.Forbidden(
              `ERROR : Can't remove a member who was involved in at least one expense`
            )
          );
        }
      }
    }

    // Update group
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        ...validationResult,
      },
      { new: true }
    );

    if (!updatedGroup) {
      return next(createError.BadRequest('ERROR : Group was not updated'));
    }

    res.json(updatedGroup);
  } catch (err) {
    next(createError.InternalServerError(err.name + ' : ' + err.message));
  }
};

exports.getBalances = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    // Get balances for all group members
    const balances = await computeBalances(groupId);
    if (!balances) {
      return next(createError.NotFound('ERROR : Group not found'));
    }

    // Compute reimbursements
    const reimbursements = computeReimbursements(balances);

    res.json({ balances, reimbursements });
  } catch (err) {
    next(createError.InternalServerError(err.name + ' : ' + err.message));
  }
};
