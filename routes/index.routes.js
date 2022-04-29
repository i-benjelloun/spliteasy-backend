const router = require('express').Router();

const authRoutes = require('./auth.routes');

const groupRoutes = require('./group.routes');

// Auth routes
router.use('/auth', authRoutes);

// Groups routes
router.use('/groups', groupRoutes);

module.exports = router;
