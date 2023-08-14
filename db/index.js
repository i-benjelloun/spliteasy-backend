const mongoose = require('mongoose');

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1/spliteasy-backend';

const connectDB = async function () {
  try {
    const x = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  } catch (err) {
    console.error('Error connecting to mongo: ', err);
  }
};

connectDB();
