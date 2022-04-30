const { Schema, model } = require('mongoose');

const shareSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  expense: { type: Schema.Types.ObjectId, ref: 'Expense' },
  share_amount: { type: Number },
});

// make sure the couple user expense is unique
shareSchema.index({ user: 1, expense: 1 }, { unique: true });
const Share = model('Share', shareSchema);

module.exports = Share;
