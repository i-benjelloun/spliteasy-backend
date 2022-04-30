const { Schema, model } = require('mongoose');
const Share = require('./Share.model');

const expenseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Restaurants/Bars',
        'Rent/Charges',
        'Groceries',
        'Shopping',
        'Accommodation',
        'Entertainment',
        'Transport',
        'Pets',
        'Other',
      ],
      default: 'Other',
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
    expense_amount: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Delete all the shares related to an expense before deleting the expense
expenseSchema.pre('findOneAndDelete', async function (next) {
  try {
    const expenseId = this.getQuery()['_id'];
    await Share.deleteMany({ expense: expenseId });
    next();
  } catch (err) {
    next(
      createError.InternalServerError('Expense shares could not be deleted')
    );
  }
});

const Expense = model('Expense', expenseSchema);

module.exports = Expense;
