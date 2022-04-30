const { Schema, model } = require('mongoose');

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

const Expense = model('Expense', expenseSchema);

module.exports = Expense;
