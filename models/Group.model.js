const { Schema, model } = require('mongoose');
const createError = require('http-errors');
const User = require('./User.model');
const Expense = require('./Expense.model');
const { currency_codes } = require('../helpers/currencies');
const Archive = require('./Archive.model');

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
});

// Delete all group expenses & shares before deleting group
groupSchema.pre('findOneAndDelete', async function (next) {
  try {
    const groupId = this.getQuery()['_id'];
    await Expense.deleteMany({ group: groupId });
    next();
  } catch (err) {
    next(
      createError.InternalServerError('Group expenses could not be deleted')
    );
  }
});

// Delete archives related to this group when deleting it
groupSchema.pre('findOneAndDelete', async function (next) {
  try {
    const groupId = this.getQuery()['_id'];
    await Archive.deleteMany({ group: groupId });
    next();
  } catch (err) {
    next(
      createError.InternalServerError(
        'Error in deleting archives related to the group'
      )
    );
  }
});

// Make group members as friends
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
    next(createError.InternalServerError('Error in updating users friends'));
  }
});

const Group = model('Group', groupSchema);

module.exports = Group;
