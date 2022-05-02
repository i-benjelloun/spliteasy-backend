const { Schema, model } = require('mongoose');
const createError = require('http-errors');
const User = require('./User.model');
const Expense = require('./Expense.model');

const groupSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  category: {
    type: String,
    enum: ['Event', 'Trip', 'Couple', 'Project', 'Other'],
    default: 'Other',
  },
  currency: { type: String },
  isArchived: { type: Boolean, default: false },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
