const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/index.route');

// const {
//     isAuthenticated
// } = require('../controllers/auth/authRedirect.controller');

router.use('/auth', authRoutes);

router.post('/file/upload', (req, res) => {
    console.log(req.body);
    res.sendStatus(200)
});

module.exports = router;