const User = require('../../models/User.model');
const bcrypt = require('bcryptjs');

exports.createUser = async () => {
  const users = [
    {
      firstName: 'Alper',
      lastName: 'GOKER',
      email: 'alper.goker@gmail.com',
      password: bcrypt.hashSync('password', 12),
    },
    {
      firstName: 'Ibrahim',
      lastName: 'Benjelloun',
      email: 'ibenjelloun93@gmail.com',
      password: bcrypt.hashSync('password', 12),
    },

    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      password: bcrypt.hashSync('password', 12),
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@gmail.com',
      password: bcrypt.hashSync('password', 12),
    },
  ];

  await User.create(users);
};
