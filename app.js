// ℹ️ Gets access to environment variables/settings
require('dotenv/config');

// COnnect to DB
require('./db');

// Handles http requests (express is node js framework)
const express = require('express');

const app = express();

// This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require('./routes/index.routes');
app.use('/api', allRoutes);

// To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
