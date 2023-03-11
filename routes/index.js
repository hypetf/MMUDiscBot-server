const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/index.route');
const uploadRoutes = require('./upload/index.route');

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;