const Group = require('../../models/Group.model');
const User = require('../../models/User.model');

exports.createGroup = async () => {
  const alper = await User.findOne({ email: 'alper.goker@gmail.com' });
  const ibrahim = await User.findOne({ email: 'ibenjelloun93@gmail.com' });
  const john = await User.findOne({ email: 'john.doe@gmail.com' });
  const jane = await User.findOne({ email: 'jane.doe@gmail.com' });

  const groups = [
    {
      title: 'Birthday party !!',
      owner: alper._id,
      category: 'Event',
      currency: 'EUR',
      IsArchived: false,
      members: [alper._id, ibrahim._id, john._id, jane._id],
    },
    {
      title: 'Trip to Istanbul',
      owner: ibrahim._id,
      category: 'Trip',
      currency: 'EUR',
      IsArchived: false,
      members: [ibrahim._id, alper._id, jane._id],
    },
  ];
  await Group.create(groups);
};
