const { Schema, model } = require('mongoose');
const createError = require('http-errors');
const User = require('./User.model');
const Expense = require('./Expense.model');
const Comment = require('./Comment.model');
const Archive = require('./Archive.model');
const { currency_codes } = require('../helpers/currencies');
require('dotenv/config');

const groupSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    type: String,
    enum: ['Event', 'Trip', 'Couple', 'Project', 'Other'],
    default: 'Other',
    required: true,
  },
  currency: {
    type: String,
    enum: currency_codes,
    default: 'EUR',
    required: true,
  },
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    required: true,
  },
  joinLink: {
    type: String,
    default: '',
  },
});

groupSchema.pre('save', async function (next) {
  try {
    this.joinLink = `${process.env.ORIGIN}/join/${this._id.toString()}`;
  } catch (err) {
    next(createError.BadRequest('JoinLink was not created'));
  }
});

// Delete archives related to this group when deleting it
groupSchema.pre('findOneAndDelete', async function (next) {
  try {
    const groupId = this.getQuery()['_id'];
    const expenses = await Expense.find({ group: groupId });
    const expensesIds = expenses.map((expense) => {
      return expense._id;
    });
    await Comment.deleteMany({ expense: { $in: expensesIds } });
    await Expense.deleteMany({ group: groupId });
    await Archive.deleteMany({ group: groupId });
    next();
  } catch (err) {
    next(createError.BadRequest('Group was not deleted'));
  }
});

// Make group members as friends
groupSchema.pre('findOneAndUpdate', async function (doc, next) {
  try {
    console.log('I fire');
    const groupMembers = this.getUpdate().members;

    for (let member of groupMembers) {
      const newFriends = groupMembers.filter((m) => {
        return m !== member;
      });

      await User.findByIdAndUpdate(member, {
        $addToSet: { friends: newFriends },
      });
    }
  } catch (err) {
    console.log(err);
    next(createError.InternalServerError('Error in updating users friends'));
  }
});

// For seeding
groupSchema.post('save', async function (doc, next) {
  try {
    const groupMembers = doc.members;
    for (let member of groupMembers) {
      const newFriends = groupMembers.filter((m) => {
        return !m.equals(member);
      });

      await User.findByIdAndUpdate(member, {
        $addToSet: { friends: newFriends },
      });
    }
  } catch (err) {
    console.log(err);
    next(createError.InternalServerError('Error in updating users friends'));
  }
});

const Group = model('Group', groupSchema);

module.exports = Group;
