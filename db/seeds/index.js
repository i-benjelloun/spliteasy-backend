const mongoose = require('mongoose');

const User = require('../../models/User.model.js');
const Group = require('../../models/Group.model.js');

const { createUser } = require('./user.seeds.js');
const { createGroup } = require('./group.seeds.js');

// Connect to database
require('../../db');

// Seed database collections
const seedDB = async function () {
  try {
    await User.deleteMany();
    await createUser();

    await Group.deleteMany();
    await createGroup();

    mongoose.connection.close();
    console.log('Seed successfull');
  } catch (error) {
    console.log('Seed failed');
    throw error;
  }
};
seedDB();