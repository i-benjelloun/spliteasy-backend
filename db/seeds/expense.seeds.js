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
      paid_by: alper._id,
      group: istanbulTrip._id,
      expense_amount: 90,
      shares: [
        {
          shared_with: alper._id,
          share_amount: 40,
        },
        {
          shared_with: ibrahim._id,
          share_amount: 25,
        },
        {
          shared_with: jane._id,
          share_amount: 25,
        },
      ],
    },
    {
      title: 'Boat trip on boasphorus',
      category: 'Transport',
      paid_by: ibrahim._id,
      group: istanbulTrip._id,
      expense_amount: 30,
      shares: [
        {
          shared_with: alper._id,
          share_amount: 20,
        },
        {
          shared_with: ibrahim._id,
          share_amount: 10,
        },
      ],
    },
    {
      title: 'Dolmabahçe museum visit',
      category: 'Other',
      paid_by: ibrahim._id,
      group: istanbulTrip._id,
      expense_amount: 45,
      shares: [
        {
          shared_with: alper._id,
          share_amount: 22.95,
        },
        {
          shared_with: jane._id,
          share_amount: 22.05,
        },
      ],
    },
    {
      title: 'Aya Sophia visit',
      category: 'Other',
      paid_by: jane._id,
      group: istanbulTrip._id,
      expense_amount: 40,
      shares: [
        {
          shared_with: ibrahim._id,
          share_amount: 20,
        },
        {
          shared_with: alper._id,
          share_amount: 20,
        },
      ],
    },
    {
      title: 'Birthday cake',
      category: 'Other',
      paid_by: john._id,
      group: birthday._id,
      expense_amount: 50,
      shares: [
        {
          shared_with: john._id,
          share_amount: 25,
        },
        {
          shared_with: alper._id,
          share_amount: 25,
        },
      ],
    },
    {
      title: 'Snacks and decorations',
      category: 'Other',
      paid_by: jane._id,
      group: birthday._id,
      expense_amount: 120,
      shares: [
        {
          shared_with: jane._id,
          share_amount: 60,
        },
        {
          shared_with: ibrahim._id,
          share_amount: 60,
        },
      ],
    },
    {
      title: 'Gift',
      category: 'Other',
      paid_by: ibrahim._id,
      group: birthday._id,
      expense_amount: 180,
      shares: [
        {
          shared_with: ibrahim._id,
          share_amount: 60,
        },
        {
          shared_with: alper._id,
          share_amount: 60,
        },
        {
          shared_with: john._id,
          share_amount: 60,
        },
      ],
    },
  ];
  await Expense.create(expenses);
};
