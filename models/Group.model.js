const { Schema, model } = require('mongoose');
const User = require('./User.model');

const groupSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  background: { type: String },
  category: {
    type: String,
    enum: ['Event', 'Trip', 'Couple', 'Project', 'Other'],
    default: 'Other',
  },
  currency: { type: String },
  isArchived: { type: Boolean, default: false },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// groupSchema.post('create', async function (next) {
//   try {
//     const members = this.getQuery()['members'];

//     for (let member of members) {
//       const user = await User.findById(member);
//       console.log(user.friends);
//     }

//     // let expenses = await Expense.find({ group: id });
//     // expenses = expenses.map((exp) => {
//     //   return exp._id;
//     // });
//     // await Share.deleteMany({ expense: { $in: expenses } });
//     // await Comment.deleteMany({ expense: { $in: expenses } });
//     // await Expense.deleteMany({ group: id });
//     next();
//   } catch (err) {
//     next(
//       createError.InternalServerError(
//         'Error in deleting expenses and shares related to the group'
//       )
//     );
//   }
// });

const Group = model('Group', groupSchema);

module.exports = Group;
