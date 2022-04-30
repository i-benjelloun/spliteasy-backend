const Expense = require('../../models/Expense.model');
const Group = require('../../models/Group.model');
const User = require('../../models/User.model');

exports.createExpense = async () => {
  const alper = await User.findOne({ email: 'alper.goker@gmail.com' });
  const ibrahim = await User.findOne({ email: 'ibenjelloun93@gmail.com' });
  const john = await User.findOne({ email: 'john.doe@gmail.com' });
  const jane = await User.findOne({ email: 'jane.doe@gmail.com' });
  const istanbulTrip = await Group.findOne({ owner: ibrahim._id });
  const birthday = await Group.findOne({ owner: alper._id });

  const expenses = [
    {
      title: 'lunch at nato restaurant',
      category: 'Restaurants/Bars',
      paidBy: alper._id,
      group: istanbulTrip._id,
      expense_amount: 90,
    },
    {
      title: 'Boat trip on boasphorus',
      category: 'Transport',
      paidBy: ibrahim._id,
      group: istanbulTrip._id,
      expense_amount: 30,
    },
    {
      title: 'Dolmabahçe museum visit',
      category: 'Other',
      paidBy: ibrahim._id,
      group: istanbulTrip._id,
      expense_amount: 45,
    },
    {
      title: 'Aya Sophia visit',
      category: 'Other',
      paidBy: john._id,
      group: istanbulTrip._id,
      expense_amount: 40,
    },
    {
      title: 'Birthday cake',
      category: 'Other',
      paidBy: john._id,
      group: birthday._id,
      expense_amount: 50,
    },
    {
      title: 'Snacks and decorations',
      category: 'Other',
      paidBy: jane._id,
      group: birthday._id,
      expense_amount: 120,
    },
    {
      title: 'Gift',
      category: 'Other',
      paidBy: ibrahim._id,
      group: birthday._id,
      expense_amount: 180,
    },
  ];
  await Expense.create(expenses);
};
