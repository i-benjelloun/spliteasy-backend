const Joi = require('joi');
const createError = require('http-errors');
const Expense = require('../models/Expense.model');

// Controller : get expenses for a specific group
exports.getExpenses = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const expenses = await Expense.find({ group: groupId }).populate(
      'paidBy',
      '-password'
    );
    console.log(expenses);
    res.json(expenses);
  } catch (error) {
    next(createError.NotFound('Route not found'));
  }
};

// Controller : create new group
// exports.createGroup = async (req, res, next) => {
//   try {
//     // Definition of validation schema
//     const schema = Joi.object({
//       title: Joi.string().trim().required(),
//       category: Joi.string().trim().required(),
//       currency: Joi.string().trim().required(),
//       isArchived: Joi.bool(),
//       members: Joi.array().required(),
//     });

//     // Get validation result
//     const validationResult = await schema.validateAsync(req.body, {
//       abortEarly: false,
//     });

//     // Create group
//     const group = await Group.create({
//       ...validationResult,
//       owner: req.payload._id,
//     });

//     res.json(group);
//   } catch (err) {
//     console.log(err);
//     next(createError.InternalServerError('Group was not created'));
//   }
// };

// Controller : delete group
// exports.deleteGroup = async (req, res, next) => {
//   try {
//     await Group.findOneAndDelete({ _id: req.params.groupId });
//     res.json('Group deleted from database!');
//   } catch (err) {
//     next(createError.InternalServerError('Error in group deletion'));
//   }
// };

// Controller : get group by id
// exports.getGroupById = async (req, res, next) => {
//   try {
//     // find group by Id and associated user then get expenses associated to that group
//     const group = await Group.findById(req.params.groupId)
//       .populate('members', '-password')
//       .populate('owner', '-password');

//     res.json(group);
//   } catch (error) {
//     next(error);
//   }
// };

// Controller : update group
// exports.updateGroup = async (req, res, next) => {
//   const { groupId } = req.params;

//   try {
//     const schema = Joi.object({
//       title: Joi.string().trim().required(),
//       category: Joi.string().trim().required(),
//       isArchived: Joi.bool(),
//       members: Joi.array().required(),
//     });
//     const validationResult = await schema.validateAsync(req.body, {
//       abortEarly: false,
//     });

//     const group = await Group.findByIdAndUpdate(
//       groupId,
//       {
//         ...validationResult,
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(group);
//   } catch (error) {
//     next(createError.InternalServerError('Error in updating group'));
//   }
// };
