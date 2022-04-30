const Expense = require('../../models/Expense.model');
const Group = require('../../models/Group.model');
const Share = require('../../models/Share.model');
const User = require('../../models/User.model');

exports.createShare = async () => {
  const alper = await User.findOne({ email: 'alper.goker@gmail.com' });
  const ibrahim = await User.findOne({ email: 'ibenjelloun93@gmail.com' });
  const john = await User.findOne({ email: 'john.doe@gmail.com' });
  const jane = await User.findOne({ email: 'jane.doe@gmail.com' });

  // Expense amount : 90
  const expense1 = await Expense.findOne({ title: 'lunch at nato restaurant' });
  const expense1_shares = [
    {
      user: john._id,
      expense: expense1._id,
      share_amount: 40,
    },
    {
      user: ibrahim._id,
      expense: expense1._id,
      share_amount: 25,
    },
    {
      user: jane._id,
      expense: expense1._id,
      share_amount: 25,
    },
  ];

  // Expense amount : 30
  const expense2 = await Expense.findOne({ title: 'Boat trip on boasphorus' });
  const expense2_shares = [
    {
      user: alper._id,
      expense: expense2._id,
      share_amount: 20,
    },
    {
      user: ibrahim._id,
      expense: expense2._id,
      share_amount: 10,
    },
  ];

  // Expense amount : 45
  const expense3 = await Expense.findOne({ title: 'Dolmabahçe museum visit' });
  const expense3_shares = [
    {
      user: alper._id,
      expense: expense3._id,
      share_amount: 22.5,
    },
    {
      user: ibrahim._id,
      expense: expense3._id,
      share_amount: 22.5,
    },
  ];

  // Expense amount : 40
  const expense4 = await Expense.findOne({ title: 'Aya Sophia visit' });
  const expense4_shares = [
    {
      user: john._id,
      expense: expense4._id,
      share_amount: 20,
    },
    {
      user: jane._id,
      expense: expense4._id,
      share_amount: 20,
    },
  ];

  // Expense amount : 50
  const expense5 = await Expense.findOne({ title: 'Birthday cake' });
  const expense5_shares = [
    {
      user: john._id,
      expense: expense5._id,
      share_amount: 25,
    },
    {
      user: alper._id,
      expense: expense5._id,
      share_amount: 25,
    },
  ];

  // Expense amount : 120
  const expense6 = await Expense.findOne({ title: 'Snacks and decorations' });
  const expense6_shares = [
    {
      user: jane._id,
      expense: expense6._id,
      share_amount: 60,
    },
    {
      user: ibrahim._id,
      expense: expense6._id,
      share_amount: 60,
    },
  ];

  // Expense amount : 180
  const expense7 = await Expense.findOne({ title: 'Gift' });
  const expense7_shares = [
    {
      user: ibrahim._id,
      expense: expense7._id,
      share_amount: 60,
    },
    {
      user: alper._id,
      expense: expense7._id,
      share_amount: 60,
    },
    {
      user: john._id,
      expense: expense7._id,
      share_amount: 60,
    },
  ];

  await Share.create([
    ...expense1_shares,
    ...expense2_shares,
    ...expense3_shares,
    ...expense4_shares,
    ...expense5_shares,
    ...expense6_shares,
    ...expense7_shares,
  ]);
};
