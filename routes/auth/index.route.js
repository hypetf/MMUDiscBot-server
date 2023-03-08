const express = require('express');
const router = express.Router();
const {
    authRedirectController,
    getAuthenticatedUser,
    logout
} = require('../../controllers/auth/authRedirect.controller');

router.get('/redirect', authRedirectController);
router.get('/login', (req, res) => {res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fredirect&response_type=code&scope=identify%20guilds`);})
router.get('/user', getAuthenticatedUser);
router.get('/logout', logout);

module.exports = router;